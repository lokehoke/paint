'use strict';

class Coor {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static sub(coor1, coor2) {
        return new Coor(coor1.x - coor2.x, coor1.y - coor2.y);
    }

    division(coor) {
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

        return this;
    }
}

class DefConfig {
    constructor() {
        this.ignoreNoDrugon = false;
        this.onlyX = false;
        this.onlyY = false;
        this.piece = {
            exist: false,
            min: new Coor(),
            max: new Coor(),
            step: new Coor(),
            exitFromContur: false
        };
    }
};

module.exports = class DragnDrop {
    constructor(item, config = null) {
        this._item = item;
        this._config = this._makeSetting(config);

        this._step = new Coor();
        this._shift = new Coor();
        this._shiftPar = new Coor();
        this._shiftMaxPar = new Coor();
        this._numStep = new Coor();

        this._moveAt = this._moveAt.bind(this);
        this._endMoving = this._endMoving.bind(this);
        this._mouseDowning = this._mouseDowning.bind(this);
        this._deleteDrop = this._deleteDrop.bind(this);
    }

    startDragonDroping() {
        this._item.addEventListener('dragstart', e => false);
        this._item.addEventListener('mousedown', this._mouseDowning);
        return this._deleteDrop;
    }

    _mouseDowning(e) {
        let item = this._item;
        if (!this._config.ignoreNoDrugon && this._issetNoDrop(e.path)) {
            return true;
        } else {
            this._findAbsPar(e.path);
            if (this._config.piece.exist) {
                this._defineStep();
            }

            let coords = this._getCoords(item);

            this._shift.x = e.pageX - coords.x;
            this._shift.y = e.pageY - coords.y;

            this._moveAt(e);
            this._emptyPositions();
            this._item.parentElement.appendChild(item);

            document.addEventListener('mousemove', this._moveAt);
            document.addEventListener('mouseup', this._endMoving);
        }
    }

    _deleteDrop() {
        this._item.removeEventListener('mousedown', this._mouseDowning);
    }

    _getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return new Coor(box.left, box.top);
    }

    _moveAt(e) {
        if (this._config.piece.exist) {
            this._movingWithPiece(e);
        } else {
            this._movingWithoutPiece(e);
        }
    }

    _endMoving() {
        document.removeEventListener('mousemove', this._moveAt);
        document.removeEventListener('mouseup', this._endMoving);
    }

    _emptyPositions() {
        this._item.style.bottom = 'auto';
        this._item.style.right = 'auto';
    }

    _findAbsPar(path) {
        let indexOwn = path.indexOf(this._item) + 1;
        path.slice(indexOwn, -6).reverse().forEach(el => {
            if (el.style.position === 'absolute' || el.style.position === 'relative' || el.style.position === 'fixed') {
                let coor = this._getCoords(el);
                this._shiftPar.x = coor.x;
                this._shiftPar.y = coor.y;
                if (this._config.piece.exist) {
                    this._defineMaxParAndStep(el);
                }
            }
        });
    }

    _defineMaxParAndStep(el) {
        this._shiftMaxPar.x = this._shiftPar.x + el.offsetWidth - this._item.offsetWidth + 1;
        this._shiftMaxPar.y = this._shiftPar.y + el.offsetHeight - this._item.offsetHeight + 1;

        if (this._config.piece.exitFromContur) {
            this._shiftPar.x -= this._item.offsetWidth/2;
            this._shiftPar.y -= this._item.offsetHeight/2;

            this._shiftMaxPar.x += this._item.offsetWidth/2;
            this._shiftMaxPar.y += this._item.offsetHeight/2;
        }

        this._numStep = Coor.sub(this._config.piece.max, this._config.piece.min).division(this._config.piece.step);
        this._step = Coor.sub(this._shiftMaxPar, this._shiftPar).division(this._numStep);
    }

    _issetNoDrop(path) {
        let isset = false;
        path.slice(0, -6).forEach(el => {
            if (el.dataset.drugon === 'noDrugon') {
                isset = true;
            }
        });
        return isset;
    }

    _movingWithPiece(e) {
        let assumption = 0.0;
        let part = 0.0;
        let cond = this._config.piece.exitFromContur;

        if (!this._config.onlyX) {
            assumption = Math.floor((e.pageY - this._shiftPar.y) / this._step.y) * this._step.y;
            part = this._item.offsetHeight / 2;

            if (assumption <= 0) {
                this._item.style.top = 0 - (cond ? part : 0) + 'px';
            } else if (assumption >= this._shiftMaxPar.y - this._shiftPar.y) {
                this._item.style.top = this._numStep.y * this._step.y - (cond ? part : 0) + 'px';
            } else {
                this._item.style.top = assumption -  (cond ? part : 0) + 'px';
            }
        }

        if (!this._config.onlyY) {
            assumption = (Math.floor((e.pageX - this._shiftPar.x) / this._step.x)) * this._step.x;
            part = this._item.offsetWidth / 2;

            if (assumption <= 0) {
                this._item.style.left = 0 - (cond ? part : 0) + 'px';
            } else if (assumption >= this._shiftMaxPar.x - this._shiftPar.x) {
                this._item.style.left = this._numStep.x * this._step.x - (cond ? part : 0) + 'px';
            } else {
                this._item.style.left = assumption - (cond ? part : 0) + 'px';
            }
        }
    }

    _movingWithoutPiece(e) {
        if (!this._config.onlyX) {
            this._item.style.top = e.pageY - this._shift.y - this._shiftPar.y + 'px';
        }

        if (!this._config.onlyY) {
            this._item.style.left = e.pageX - this._shift.x - this._shiftPar.x + 'px';
        }
    }

    _defineStep() {
        let addx = 0;
        let addY = 0;

        if (this._config.exitFromContur) {

        }
    }

    _makeSetting(config) {
        let defaults = new DefConfig();
        let reWrite = (obj, standartObj) => {
            if (typeof obj === 'object' && obj !== null && typeof standartObj === 'object' && standartObj !== null ) {
                for (let value in standartObj) {
                    if (typeof standartObj[value] !== typeof obj[value]) {
                        continue;
                    } else if (typeof standartObj[value] !== 'object') {
                        standartObj[value] = obj[value];
                    } else {
                        reWrite(obj[value], standartObj[value]);
                    }
                }
            }
        }

        if (typeof config === 'object' && config !== null) {
			reWrite(config, defaults);
		}

        return defaults;
    }
}
