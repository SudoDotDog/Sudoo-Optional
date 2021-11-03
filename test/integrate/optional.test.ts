/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 * @override Integrate
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Optional } from "../../src";

describe('Given {Optional} Integrate', (): void => {

    const chance: Chance.Chance = new Chance('integrate-optional-optional');

    it('should be able to construct to empty with other type', (): void => {

        const optional: Optional<string> = Optional.of<string>(undefined);

        const result: string | undefined = optional.getOrUndefined();

        expect(optional.exists).to.be.false;
        expect(result).to.be.equal(undefined);
    });

    it('should be able to get with or undefined', (): void => {

        const target: string = chance.string();
        const optional: Optional<string> = Optional.of(target);

        const result: string | undefined = optional.getOrUndefined();

        expect(optional.exists).to.be.true;
        expect(result).to.be.equal(target);
    });
});
