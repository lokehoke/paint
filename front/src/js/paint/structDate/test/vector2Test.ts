'use strict';

import 'mocha';
import { expect } from 'chai';

import { Vector2 } from '../vector2';

describe('Vector2 test', () => {
    it('Create', () => {
        const x = 1;
        const y = 2;

        const v = new Vector2(x, y);
        expect(v.x).to.equal(x);
        expect(v.y).to.equal(y);
    });

    it('isEqual', () => {
        const v1 = new Vector2(2, 2);
        const v2 = new Vector2(1, 1);
        const v3 = new Vector2(1, 1);

        expect(v1.isEqual(v1)).to.be.true;
        expect(v1.isEqual(v2)).to.be.false;
        expect(v2.isEqual(v3)).to.be.true;

        expect(Vector2.isEqualVectors(v1, v1)).to.be.true;
        expect(Vector2.isEqualVectors(v1, v2)).to.be.false;
        expect(Vector2.isEqualVectors(v2, v3)).to.be.true;
    });

    it('sub method', () => {
        const v1 = new Vector2(2, 2);
        const v2 = new Vector2(1, 1);

        const rt = new Vector2(1, 1);
        expect(Vector2.sub(v1, v2).isEqual(rt)).to.be.true;

        const r = v1.sub(v2);
        expect(r.x).to.equal(1);
        expect(r.y).to.equal(1);
    });

    it('sum method', () => {
        const v1 = new Vector2(2, 2);
        const v2 = new Vector2(1, 1);

        const rt = new Vector2(3, 3);
        expect(Vector2.sum(v1, v2).isEqual(rt)).to.be.true;

        const r = v1.sum(v2);
        expect(r.x).to.equal(3);
        expect(r.y).to.equal(3);
    });

    it('division on number method', () => {
        const v1 = new Vector2(8, 8);
        const num = 4;

        const rt = new Vector2(2, 2);
        expect(Vector2.divisionOnNumber(v1, num).isEqual(rt)).to.be.true;

        const r = v1.divisionOnNumber(num);
        expect(r.x).to.equal(2);
        expect(r.y).to.equal(2);
    });

    it('division on Vector method', () => {
        const v1 = new Vector2(8, 8);
        const v2 = new Vector2(4, 2);

        const rt = new Vector2(2, 4);
        expect(Vector2.divisionOnVector(v1, v2).isEqual(rt)).to.be.true;
        const r = v1.divisionOnVector(v2);
        expect(r.x).to.equal(2);
        expect(r.y).to.equal(4);
    });

    it('dotProduct method', () => {
        const v1 = new Vector2(4, 4);
        const v2 = new Vector2(5, 5);

        const rt = 40;
        expect(Vector2.dotProduct(v1, v2) == rt).to.be.true;

        const r = v1.dotProduct(v2);
        expect(r).to.equal(40);
    });

    it('int mode', () => {
        const v1 = new Vector2(8, 8);
        const v2 = new Vector2(3, 6);

        const rt = new Vector2(2, 1);
        expect(Vector2.divisionOnVector(v1, v2, 'int').isEqual(rt)).to.be.true;

        const num = 3;
        const v3 = new Vector2(2, 2);

        expect(Vector2.divisionOnNumber(v1, num, 'int').isEqual(v3));

        const v4 = new Vector2(6.3, -2.8);
        const v5 = new Vector2(6, -3);

        v4.toInt();
        expect(v4.isEqual(v5)).to.be.true;
    });
});
