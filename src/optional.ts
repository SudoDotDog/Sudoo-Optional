/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 */

export class Optional<T extends any = any> {

    public static of<T extends any = any>(target?: T): Optional<T> {

        return new Optional<T>(target);
    }

    private readonly _target?: T;

    private constructor(target?: T) {

        this._target = target;
    }

    public get exists(): boolean {

        return typeof this._target !== 'undefined';
    }

    public get value(): T | undefined {

        return this._target;
    }
}
