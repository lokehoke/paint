'use strict';

export class Vector2 {
    public x: number;
    public y: number;

    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    static sub(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static sum(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static divisionOnNumber(a: Vector2, b: number, type = 'double'): Vector2 {
        const t: Vector2 = new Vector2();
        t.setDimensions(a);
        return t.divisionOnNumber(b, type);
    }

    static divisionOnVector(a: Vector2, b: Vector2, type = 'double'): Vector2 {
        const t1: Vector2 = new Vector2();
        t1.setDimensions(a);
        const t2: Vector2 = new Vector2();
        t2.setDimensions(b);
        return t1.divisionOnVector(t2, type);
    }

    static dotProduct(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    static isEqualVectors(a: Vector2, b: Vector2): boolean {
        return a.isEqual(b);
    }

    isEqual(a: Vector2): boolean {
        return this.x === a.x && this.y === a.y;
    }

    sub(a: Vector2): Vector2 {
        this.setDimensions(Vector2.sub(this, a));
        return this;
    }

    sum(a: Vector2): Vector2 {
        this.setDimensions(Vector2.sum(this, a));
        return this;
    }

    divisionOnVector(a: Vector2, type = 'double'): Vector2 {
        this.x /= a.x;
        this.y /= a.y;

        if (type === 'int') {
            this.toInt();
        }

        return this;
    }

    divisionOnNumber(num: number, type = 'double'): Vector2 {
        this.x /= num;
        this.y /= num;
        if (type === 'int') {
            this.toInt();
        }

        return this;
    }

    dotProduct(a: Vector2): number {
        return this.x * a.x + this.y * a.y;
    }

    setDimensions(a: Vector2): Vector2 {
        this.x = a.x;
        this.y = a.y;
        return this;
    }

    toInt(): Vector2 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    toString(): string {
        return `
->X ${this.x}
->Y ${this.y}`;
    }
}
