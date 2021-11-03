/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 */

import { EmptyValueSymbol, SEmptyValue } from "@sudoo/symbol";
import { OptionalFunction } from "./function";

export class Optional<T extends any = any> {

    public static of<T extends any = any>(target: T | SEmptyValue | undefined, identifier?: string): Optional<T> {

        return new Optional(target, identifier);
    }

    public static resolve<T extends any = any>(target: T | SEmptyValue | undefined | Optional<T>, identifier?: string): Optional<T> {

        if (target instanceof Optional) {

            if (typeof identifier !== 'undefined') {
                return Optional.of(target.getOrEmptyValueSymbol(), identifier);
            }
            if (typeof target._identifier !== 'undefined') {
                return Optional.of(target.getOrEmptyValueSymbol(), target._identifier);
            }
            return Optional.of(target.getOrEmptyValueSymbol());
        }
        return Optional.of(target, identifier);
    }

    private readonly _target: T | SEmptyValue;
    private readonly _identifier?: string;

    private constructor(target: T | SEmptyValue | undefined, identifier?: string) {

        if (typeof target === 'undefined') {
            this._target = EmptyValueSymbol;
        } else {
            this._target = target;
        }

        this._identifier = identifier;
    }

    public get identifier(): string | SEmptyValue {
        return this._identifier;
    }
    public get exists(): boolean {
        return this._target !== EmptyValueSymbol;
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

        if (this._target === EmptyValueSymbol) {
            return undefined;
        }
        return this._target;
    }

    public getOrNull(): T | null {

        if (this._target === EmptyValueSymbol) {
            return null;
        }
        return this._target;
    }

    public getOrEmptyValueSymbol(): T | SEmptyValue {

        return this._target;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    public asFunction(): OptionalFunction<T extends Function ? T : any> {

        return OptionalFunction.ofFunctionOrUndefined(this._target as any, this._identifier);
    }
}
