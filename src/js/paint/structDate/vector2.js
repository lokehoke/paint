'use strict';

export default class Vector2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    static sub(vector1, vector2) {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static sum(vector1, vector2) {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    sub(vector) {
        this.setDimensions(Vector2.sub(this, vector));
        return this;
    }

    sum(vector) {
        this.setDimensions(Vector2.sum(this, vector));
        return this;
    }

    divisionOnVector(vector, type) {
        if (vector.x) {
            this.x /= vector.x;
        } else if (+vector.x === 0) {
            this.x = 0;
        }

        if (vector.y) {
            this.y /= vector.y;
        } else if (+vector.y === 0) {
            this.y = 0;
        }

        if (type === 'int') {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
        }

        return this;
    }

    divisionOnNumber(num) {
        this.x /= num;
        this.y /= num;
        
        return this;
    }

    setDimensions(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }
}
