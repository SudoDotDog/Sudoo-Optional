/**
 * @author WMXPY
 * @namespace Optional
 * @description Function
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { OptionalFunction } from "../../src";

describe('Given {OptionalFunction} Class', (): void => {

    const chance: Chance.Chance = new Chance('optional-function');

    it('should be able to construct', (): void => {

        const targetReturn: string = chance.string();
        const optional: OptionalFunction = OptionalFunction
            .ofFunction(() => {
                return targetReturn;
            });

        expect(optional).to.be.instanceOf(OptionalFunction);
    });
});
