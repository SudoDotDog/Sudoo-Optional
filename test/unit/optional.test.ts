/**
 * @author WMXPY
 * @namespace Optional
 * @description Optional
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Optional } from "../../src";

describe('Given {Optional} class', (): void => {

    const chance: Chance.Chance = new Chance('optional-optional');

    it('should be able to construct', (): void => {

        const target: string = chance.string();
        const optional: Optional = Optional.of(target);

        expect(optional).to.be.instanceOf(Optional);
    });
});
