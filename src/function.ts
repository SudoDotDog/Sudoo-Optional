/**
 * @author WMXPY
 * @namespace Optional
 * @description Function
 */

import { EmptyValueSymbol, SEmptyValue } from "@sudoo/symbol";

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
}
