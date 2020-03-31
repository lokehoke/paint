'use strict';

export class Vector2 {
    private accuracy: number = 3;
    public x: number;
    public y: number;

    constructor(x: number = 0.0, y: number = 0.0, accuracy: number = 3) {
        this.accuracy = accuracy;
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

    static scalarMultiplication(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    static isEqualVectors(a: Vector2, b: Vector2): boolean {
        return a.isEqual(b);
    }

    setAccuracy(accuracy: number) {
        this.accuracy = Math.floor(accuracy);
    }

    getAccuracy(): number {
        return this.accuracy;
    }

    isEqual(a: Vector2): boolean {
        return this.x === a.x && this.y === a.y;
    }

    sub(a: Vector2) {
        this.setDimensions(Vector2.sub(this, a));
        if (this.accuracy > a.accuracy) {
            this.accuracy = a.accuracy;
        }
        return this;
    }

    sum(a: Vector2) {
        this.setDimensions(Vector2.sum(this, a));
        if (this.accuracy > a.accuracy) {
            this.accuracy = a.accuracy;
        }
        return this;
    }

    divisionOnVector(a: Vector2, type: string = 'double') {
        this.x /= a.x;
        this.y /= a.y;
        if (this.accuracy > a.accuracy) {
            this.accuracy = a.accuracy;
        }

        if (type === 'int') {
            this.toInt();
        }

        return this;
    }

    divisionOnNumber(num: number, type: string = 'double') {
        this.x /= num;
        this.y /= num;
        this.accuracy = this.accuracy / num;
        if (type === 'int') {
            this.toInt();
        }

        return this;
    }

    scalarMultiplication(a: Vector2): number {
        return this.x * a.x + this.y * a.y;
    }

    setDimensions(a: Vector2) {
        this.x = a.x;
        this.y = a.y;
        return this;
    }

    toInt() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    toString(): string {
        return `->X ${this.x}\n->Y ${this.y}\n->Accuracy ${this.accuracy}`;
    }
}