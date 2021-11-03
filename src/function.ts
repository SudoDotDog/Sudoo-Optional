/**
 * @author WMXPY
 * @namespace Optional
 * @description Function
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export class OptionalFunction<T extends Function> {

    // eslint-disable-next-line @typescript-eslint/ban-types
    public static ofFunctionOrUndefined<T extends Function>(target?: T, identifier?: string): OptionalFunction<T> {

        if (typeof target === 'undefined') {
            return OptionalFunction.ofUndefined(identifier);
        }

        if (typeof target !== 'function') {
            return OptionalFunction.ofUndefined(identifier);
        }

        return new OptionalFunction<T>(target, identifier);
    }

    public static ofUndefined(identifier?: string): OptionalFunction<any> {
        return new OptionalFunction<any>(undefined, identifier);
    }

    private readonly _target?: T;
    private readonly _identifier?: string;

    private constructor(target?: T, identifier?: string) {

        this._target = target;
        this._identifier = identifier;
    }
}
