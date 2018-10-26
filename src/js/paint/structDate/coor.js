module.exports = class Coor {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    static sub(coor1, coor2) {
        return new Coor(coor1.x - coor2.x, coor1.y - coor2.y);
    }

    static sum(coor1, coor2) {
        return new Coor(coor1.x + coor2.x, coor1.y + coor2.y);
    }

    sub(coor) {
        this.setCoor(Coor.sub(this, coor));
        return this;
    }

    sum(coor) {
        this.setCoor(Coor.sum(this, coor));
        return this;
    }

    divisionOnCoor(coor, type) {
        if (coor.x && typeof coor.x === 'number') {
            this.x /= coor.x;
        } else if (coor.x === 0) {
            this.x = 0;
        }

        if (coor.y && typeof coor.y === 'number') {
            this.y /= coor.y;
        } else if (coor.y === 0) {
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

    setCoor(coor) {
        this.x = coor.x;
        this.y = coor.y;
    }
}
