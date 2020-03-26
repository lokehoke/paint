'use strict';

export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }

    static sub(a: Vector2, b: Vector2) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static sum(a: Vector2, b: Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static divisionOnNumber(a: Vector2, b: number, type: string = 'double'): Vector2 {
        let t: Vector2 = new Vector2();
        t.setDimensions(a);
        return t.divisionOnNumber(b, type);
    }

    static divisionOnVector(a: Vector2, b: Vector2, type: string = 'double'): Vector2 {
        let t1: Vector2 = new Vector2();
        t1.setDimensions(a);
        let t2: Vector2 = new Vector2();
        t2.setDimensions(b);
        return t1.divisionOnVector(t2, type);
    }

    static isEqualVectors(a: Vector2, b: Vector2): boolean {
        return a.isEqual(b);
    }

    isEqual(a: Vector2): boolean {
        return this.x === a.x && this.y === a.y;
    }

    sub(a: Vector2) {
        this.setDimensions(Vector2.sub(this, a));
        return this;
    }

    sum(a: Vector2) {
        this.setDimensions(Vector2.sum(this, a));
        return this;
    }

    divisionOnVector(a: Vector2, type: string = 'double') {
        this.x /= a.x;
        this.y /= a.y;

        if (type === 'int') {
            this.toInt();
        }

        return this;
    }

    divisionOnNumber(num: number, type: string = 'double') {
        this.x /= num;
        this.y /= num;

        if (type === 'int') {
            this.toInt();
        }

        return this;
    }

    setDimensions(a: Vector2) {
        this.x = a.x;
        this.y = a.y;
    }

    toInt(): void {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }
}