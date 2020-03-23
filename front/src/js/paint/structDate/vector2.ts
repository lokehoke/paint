'use strict';

export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }

    static sub(vector1: Vector2, vector2: Vector2) {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static sum(vector1: Vector2, vector2: Vector2) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static divisionOnNumber(a: Vector2, b: number): Vector2 {
        let t: Vector2 = new Vector2();
        t.setDimensions(a);
        return t.divisionOnNumber(b);
    }

    static divisionVector(a: Vector2, b: Vector2, type: string = 'double'): Vector2 {
        let t1: Vector2 = new Vector2();
        t1.setDimensions(a);
        let t2: Vector2 = new Vector2();
        t2.setDimensions(b);
        return t1.divisionOnVector(t2, type);
    }

    sub(vector: Vector2) {
        this.setDimensions(Vector2.sub(this, vector));
        return this;
    }

    sum(vector: Vector2) {
        this.setDimensions(Vector2.sum(this, vector));
        return this;
    }

    divisionOnVector(a: Vector2, type: string = 'double') {
        if (a.x) {
            this.x /= a.x;
        } else if (a.x === 0) {
            this.x = 0;
        }

        if (a.y) {
            this.y /= a.y;
        } else if (a.y === 0) {
            this.y = 0;
        }

        if (type === 'int') {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
        }

        return this;
    }

    divisionOnNumber(num: number) {
        this.x /= num;
        this.y /= num;

        return this;
    }

    setDimensions(vector: Vector2) {
        this.x = vector.x;
        this.y = vector.y;
    }
}