/**
 * @author WMXPY
 * @namespace Optional
 * @description Function
 */

import { EmptyValueSymbol, SEmptyValue } from "@sudoo/symbol";
import { ArgumentTypes, ReturnTypes } from "./declare";

// eslint-disable-next-line @typescript-eslint/ban-types
export class OptionalFunction<T extends Function> {

    // eslint-disable-next-line @typescript-eslint/ban-types
    public static ofFunctionOrUndefined<T extends Function>(target: T | SEmptyValue | undefined, identifier?: string): OptionalFunction<T> {

        if (typeof target === 'undefined') {
            return OptionalFunction.ofEmpty(identifier);
        }

        if (typeof target !== 'function') {
            return OptionalFunction.ofEmpty(identifier);
        }

        return new OptionalFunction<T>(target, identifier);
    }

    public static ofEmpty(identifier?: string): OptionalFunction<any> {
        return new OptionalFunction<any>(EmptyValueSymbol, identifier);
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

    public get identifier(): string | undefined {
        return this._identifier;
    }
    public get exists(): boolean {
        return this._target !== EmptyValueSymbol;
    }

    public executeOrThrow(error?: Error, ...args: ArgumentTypes<T>): ReturnTypes<T> {

        if (this._target === EmptyValueSymbol) {

            if (typeof error !== 'undefined') {
                throw error;
            }

            if (typeof this._identifier === 'string') {
                throw new Error(`[Sudoo-Optional] Execute Undefined Target, Identifier: ${this._identifier}`);
            }

            throw new Error("[Sudoo-Optional] Get Unnamed Undefined Target");
        }
        return this._target(...args);
    }

    public executeOrDefault(defaultReturn: ReturnTypes<T>, ...args: ArgumentTypes<T>): ReturnTypes<T> {

        if (this._target === EmptyValueSymbol) {
            return defaultReturn;
        }
        return this._target(...args);
    }

    public executeOrUndefined(...args: ArgumentTypes<T>): ReturnTypes<T> | undefined {

        if (this._target === EmptyValueSymbol) {
            return undefined;
        }
        return this._target(...args);
    }

    public executeOrNull(...args: ArgumentTypes<T>): ReturnTypes<T> | null {

        if (this._target === EmptyValueSymbol) {
            return null;
        }
        return this._target(...args);
    }

    public executeOrEmptyValueSymbol(...args: ArgumentTypes<T>): ReturnTypes<T> | SEmptyValue {

        if (this._target === EmptyValueSymbol) {
            return EmptyValueSymbol;
        }
        return this._target(...args);
    }
}
