/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 */

import { EmptyValueSymbol, SEmptyValue } from "@sudoo/symbol";
import { OptionalFunction } from "./function";

export class Optional<T = any> {

    public static ofAny<T = any>(
        target: T | SEmptyValue | Optional<T>,
        identifier?: string,
    ): Optional<T> {

        if (target instanceof Optional) {

            if (typeof identifier !== 'undefined') {
                return Optional.ofAny(target.getOrEmptyValueSymbol(), identifier);
            }
            if (typeof target._identifier !== 'undefined') {
                return Optional.ofAny(target.getOrEmptyValueSymbol(), target._identifier);
            }
            return Optional.ofAny(target.getOrEmptyValueSymbol());
        }

        return new Optional(target, identifier);
    }

    public static ofNullable<T = any>(
        target: T | SEmptyValue | Optional<T> | null,
        identifier?: string,
    ): Optional<T> {

        if (target === null) {
            return Optional.ofEmpty(identifier);
        }
        return Optional.ofAny(target, identifier);
    }

    public static ofUndefinable<T = any>(
        target: T | SEmptyValue | Optional<T> | undefined,
        identifier?: string,
    ): Optional<T> {

        if (typeof target === 'undefined') {
            return Optional.ofEmpty(identifier);
        }
        return Optional.ofAny(target, identifier);
    }

    public static ofNullAndUndefinable<T = any>(
        target: T | SEmptyValue | Optional<T> | null | undefined,
        identifier?: string,
    ): Optional<T> {

        if (target === null || typeof target === 'undefined') {
            return Optional.ofEmpty(identifier);
        }
        return Optional.ofAny(target, identifier);
    }

    public static ofEmpty(identifier?: string): Optional<any> {
        return Optional.ofAny(EmptyValueSymbol, identifier);
    }

    public static ofNull(identifier?: string): Optional<any> {
        return Optional.ofNullable(null, identifier);
    }

    public static ofUndefined(identifier?: string): Optional<any> {
        return Optional.ofUndefinable(undefined, identifier);
    }

    private readonly _target: T | SEmptyValue;
    private readonly _identifier?: string;

    private constructor(
        target: T | SEmptyValue,
        identifier?: string,
    ) {

        this._target = target;
        this._identifier = identifier;
    }

    public get identifier(): string | undefined {
        return this._identifier;
    }
    public get exists(): boolean {
        return this._target !== EmptyValueSymbol;
    }

    public optionalIdentifier(identifier: string): Optional<string> {
        return Optional.ofUndefinable(this._identifier, identifier);
    }

    public map<K>(
        target: (current: T) => K,
        identifier?: string,
    ): Optional<K> {

        if (this.exists) {
            const result: K = target(this._target as T);
            return Optional.ofAny(result);
        }
        return Optional.ofEmpty(identifier);
    }

    public ifExist(
        target: (current: T) => void,
    ): this {

        if (this.exists) {
            target(this._target as T);
        }
        return this;
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

        return OptionalFunction.ofFunction<any>(
            this.getOrEmptyValueSymbol(),
            this._identifier,
        );
    }
}
