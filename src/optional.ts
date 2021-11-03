/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 */

import { OptionalFunction } from "./function";

export class Optional<T extends any = any> {

    public static of<T extends any = any>(target?: T, identifier?: string): Optional<T> {

        return new Optional(target, identifier);
    }

    public static resolve<T extends any = any>(target?: T | Optional<T>, identifier?: string): Optional<T> {

        if (target instanceof Optional) {

            if (typeof identifier !== 'undefined') {
                return Optional.of(target.value, identifier);
            }
            if (typeof target._identifier !== 'undefined') {
                return Optional.of(target.value, target._identifier);
            }
            return Optional.of(target.value);
        }
        return Optional.of(target, identifier);
    }

    private readonly _target?: T;
    private readonly _identifier?: string;

    private constructor(target?: T, identifier?: string) {

        this._target = target;
        this._identifier = identifier;
    }

    public get identifier(): string | undefined {
        return this._identifier;
    }
    public get exists(): boolean {
        return typeof this._target !== 'undefined';
    }
    public get value(): T | undefined {
        return this._target;
    }

    public optionalIdentifier(identifier: string): Optional<string> {
        return Optional.of(this._identifier, identifier);
    }

    public getOrThrow(error?: Error): T {

        if (this.exists) {

            return this._target as T;
        }

        if (typeof error === 'undefined') {

            if (typeof this._identifier === 'string') {

                throw new Error(`[Sudoo-Optional] Get Undefined Target, Identifier: ${this._identifier}`);
            }

            throw new Error("[Sudoo-Optional] Get Unnamed Undefined Target");
        }
        throw error;
    }

    public getOrDefault(defaultValue: T): T {

        if (this.exists) {

            return this._target as T;
        }
        return defaultValue;
    }

    public getOrUndefined(): T | undefined {

        return this._target;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public asFunction(): OptionalFunction<T extends Function ? T : any> {

        return OptionalFunction.ofFunctionOrUndefined(this._target as any, this._identifier);
    }
}
