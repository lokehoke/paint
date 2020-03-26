'use strict';

import { expect } from 'chai';

import 'mocha';

import { Vector2 } from '../vector2';

describe('Vector2 test', () => {
    it('Create', () => {
        let x: number = 1;
        let y: number = 2;

        const v: Vector2 = new Vector2(x, y);
        expect(v.x).to.equal(x);
        expect(v.y).to.equal(y);
    });

    it('isEqual', () => {
        let v1: Vector2 = new Vector2(2, 2);
        let v2: Vector2 = new Vector2(1, 1);
        let v3: Vector2 = new Vector2(1, 1);

        expect(v1.isEqual(v1)).to.be.true;
        expect(v1.isEqual(v2)).to.be.false;
        expect(v2.isEqual(v3)).to.be.true;

        expect(Vector2.isEqualVectors(v1, v1)).to.be.true;
        expect(Vector2.isEqualVectors(v1, v2)).to.be.false;
        expect(Vector2.isEqualVectors(v2, v3)).to.be.true;
    });

    it('sub method', () => {
        let v1: Vector2 = new Vector2(2, 2);
        let v2: Vector2 = new Vector2(1, 1);

        let rt: Vector2 = new Vector2(1, 1);
        expect(Vector2.sub(v1, v2).isEqual(rt)).to.be.true;

        let r: Vector2  = v1.sub(v2);
        expect(r.x).to.equal(1);
        expect(r.y).to.equal(1);

    });

    it('sum method', () => {
        let v1: Vector2 = new Vector2(2, 2);
        let v2: Vector2 = new Vector2(1, 1);

        let rt: Vector2 = new Vector2(3, 3);
        expect(Vector2.sum(v1, v2).isEqual(rt)).to.be.true;

        let r: Vector2  = v1.sum(v2);
        expect(r.x).to.equal(3);
        expect(r.y).to.equal(3);

    });

    it('division on number method', () => {
        let v1: Vector2 = new Vector2(8, 8);
        let num: number = 4;

        let rt: Vector2 = new Vector2(2, 2);
        expect(Vector2.divisionOnNumber(v1, num).isEqual(rt)).to.be.true;

        let r: Vector2  = v1.divisionOnNumber(num);
        expect(r.x).to.equal(2);
        expect(r.y).to.equal(2);

    });

    it('division on Vector method', () => {
        let v1: Vector2 = new Vector2(8, 8);
        let v2: Vector2 = new Vector2(4, 2);

        let rt: Vector2 = new Vector2(2, 4);
        expect(Vector2.divisionOnVector(v1, v2).isEqual(rt)).to.be.true;

        let r: Vector2  = v1.divisionOnVector(v2);
        expect(r.x).to.equal(2);
        expect(r.y).to.equal(4);
    });

    it('int mode', () => {
        let v1: Vector2 = new Vector2(8, 8);
        let v2: Vector2 = new Vector2(3, 6);

        let rt: Vector2 = new Vector2(2, 1);
        expect(Vector2.divisionOnVector(v1, v2, 'int').isEqual(rt)).to.be.true;

        let num = 3;
        let v3: Vector2 = new Vector2(2, 2);

        expect(Vector2.divisionOnNumber(v1, num, 'int').isEqual(v3));

        let v4: Vector2 = new Vector2(6.3, -2.8);
        let v5: Vector2 = new Vector2(6, -3);

        v4.toInt();
        expect(v4.isEqual(v5)).to.be.true;
    });
});