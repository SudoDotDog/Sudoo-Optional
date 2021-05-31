/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 */

export class Optional<T extends any = any> {

    public static of<T extends any = any>(target?: T, identifier?: string): Optional<T> {

        return new Optional<T>(target, identifier);
    }

    public static resolve<T extends any = any>(target?: T | Optional<T>, identifier?: string): Optional<T> {

        if (target instanceof Optional) {

            return Optional.of(target.value, identifier);
        }
        return Optional.of(target, identifier);
    }

    private readonly _target?: T;
    private readonly _identifier?: string;

    private constructor(target?: T, identifier?: string) {

        this._target = target;
        this._identifier = identifier;
    }

    public get exists(): boolean {

        return typeof this._target !== 'undefined';
    }

    public get value(): T | undefined {

        return this._target;
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
}
