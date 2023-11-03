/**
 * @author WMXPY
 * @namespace Optional
 * @description Function
 * @override Integrate
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { OptionalFunction } from "../../src";

describe('Given {OptionalFunction} Integrate', (): void => {

    const chance: Chance.Chance = new Chance('integrate-optional-function');

    it('should be able to construct to empty with other type', (): void => {

        const optional: OptionalFunction<() => string> = OptionalFunction.ofFunction(chance.string() as any);

        const result: string | undefined = optional.executeOrUndefined();

        expect(optional.exists).to.be.false;
        expect(result).to.be.equal(undefined);
    });

    it('should be able to execute with or undefined', (): void => {

        const targetReturn: string = chance.string();
        const optional: OptionalFunction<() => string> = OptionalFunction.ofFunction(() => {
            return targetReturn;
        });

        const result: string | undefined = optional.executeOrUndefined();

        expect(optional.exists).to.be.true;
        expect(result).to.be.equal(targetReturn);
    });
});
