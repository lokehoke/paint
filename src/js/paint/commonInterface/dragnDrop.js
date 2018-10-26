'use strict';

class Coor {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }

    static sub(coor1, coor2) {
        return new Coor(coor1.x - coor2.x, coor1.y - coor2.y);
    }

    division(coor, type) {
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
}

class DefConfig {
    constructor() {
        this.ignoreNoDrugon = false;
        this.showAfterMount = {
            isset: false,
            type: 'flex'
        }
        this.onlyX = false;
        this.onlyY = false;
        this.piece = {
            exist: false,
            min: new Coor(),
            max: new Coor(),
            step: new Coor(),
            exitFromContur: false,
            cur: new Coor()
        };
        this.transferDate = () => {};
    }
};

module.exports = class DragnDrop {
    constructor(item, config = null) {
        this._item = item;
        this._config = this._makeSetting(config);

        this._stepPx = new Coor();
        this._shiftOnItemPx = new Coor();
        this._coorMinPar = new Coor();
        this._coorMaxPar = new Coor();

        this._steps = {
            current: new Coor(),
            max: new Coor()
        };

        this._moveAt = this._moveAt.bind(this);
        this._endMoving = this._endMoving.bind(this);
        this._mouseDowning = this._mouseDowning.bind(this);
        this._deleteDrop = this._deleteDrop.bind(this);
    }

    async startDragonDroping() {
        await setTimeout(() => {}, 0);
        this._item.addEventListener('dragstart', e => false);
        this._item.addEventListener('mousedown', this._mouseDowning);

        if (this._config.piece.exist) {
            this._findAbsPar();
            this._movingWithPiece({
                setUp: true
            });
        }

        if (this._config.showAfterMount.isset) {
            this._item.style.display = this._config.showAfterMount.type;
        }

        return this._deleteDrop;
    }

    _mouseDowning(e) {
        let item = this._item;

        if (!this._config.ignoreNoDrugon && this._issetNoDrop(e.path)) {
            return true;
        } else {
            this._findAbsPar();
            let coords = this._getCoords(item);

            this._shiftOnItemPx = Coor.sub(new Coor(e.pageX, e.pageY), coords);

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

    _findAbsPar() {
        let path = this._makeParrentPath();
        let par = path.find(el =>
            (el.style.position === 'absolute' || el.style.position === 'relative' || el.style.position === 'fixed')
        );
        let coor = this._getCoords(par || document.body);
        console.log(par);
        console.log(coor);
        this._coorMinPar = coor;
        if (this._config.piece.exist) {
            this._defineMaxParAndStep(par);
        }
    }

    _defineMaxParAndStep(el) {
        this._coorMaxPar.x = this._coorMinPar.x + el.offsetWidth - this._item.offsetWidth + 1;
        this._coorMaxPar.y = this._coorMinPar.y + el.offsetHeight - this._item.offsetHeight + 1;

        if (this._config.piece.exitFromContur) {
            this._coorMinPar.x -= this._item.offsetWidth / 2;
            this._coorMinPar.y -= this._item.offsetHeight / 2;

            this._coorMaxPar.x += this._item.offsetWidth / 2;
            this._coorMaxPar.y += this._item.offsetHeight / 2;
        }

        this._steps.max = Coor.sub(this._config.piece.max, this._config.piece.min).division(this._config.piece.step, 'int');
        this._stepPx = Coor.sub(this._coorMaxPar, this._coorMinPar).division(this._steps.max);
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
        let assumptionOfNewPosition = 0.0;

        let partOfExitFromConturPx = 0.0;
        let condOfExitFromContur = this._config.piece.exitFromContur;

        let dominateAxis = '';
        let changingSide = '';

        if (!this._config.onlyX) {
            dominateAxis = 'y';
            partOfExitFromConturPx = this._item.offsetHeight / 2;
            changingSide = 'top';
        } else if(!this._config.onlyY) {
            dominateAxis = 'x';
            partOfExitFromConturPx = this._item.offsetWidth / 2;
            changingSide = 'left';
        }

        let newStep = Math.floor((this._config.piece.cur[dominateAxis] - this._config.piece.min[dominateAxis])/this._config.piece.step[dominateAxis]);

        if (!e.setUp) {
            let pageCoorOfMouse = new Coor(e.pageX, e.pageY);
            newStep = Math.floor((pageCoorOfMouse[dominateAxis] - this._coorMinPar[dominateAxis]) / this._stepPx[dominateAxis]);
        }

        assumptionOfNewPosition = newStep * this._stepPx[dominateAxis];

        if (assumptionOfNewPosition <= 0) {
            this._item.style[changingSide] = 0 - (condOfExitFromContur ? partOfExitFromConturPx : 0) + 'px';
            this._steps.current[dominateAxis] = 0;
        } else if (assumptionOfNewPosition >= this._coorMaxPar[dominateAxis] - this._coorMinPar[dominateAxis]) {
            this._item.style[changingSide] = this._steps.max[dominateAxis] * this._stepPx[dominateAxis] - (condOfExitFromContur ? partOfExitFromConturPx : 0) + 'px';
            this._steps.current[dominateAxis] = this._steps.max[dominateAxis];
        } else {
            this._item.style[changingSide] = assumptionOfNewPosition - (condOfExitFromContur ? partOfExitFromConturPx : 0) + 'px';
            this._steps.current[dominateAxis] = newStep;
        }

        this._config.transferDate({
            currentStep: (this._steps.current[dominateAxis] * this._config.piece.step[dominateAxis]) + this._config.piece.min[dominateAxis]
        });
    }

    _movingWithoutPiece(e) {
        if (!this._config.onlyX) {
            this._item.style.top = e.pageY - this._shiftOnItemPx.y - this._coorMinPar.y + 'px';
        }

        if (!this._config.onlyY) {
            this._item.style.left = e.pageX - this._shiftOnItemPx.x - this._coorMinPar.x + 'px';
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

    _makeParrentPath() {
        let path = [];
        let curItem = this._item;
        while(curItem.parentNode) {
            path.push(curItem.parentNode);
            curItem = curItem.parentNode;
        }
        path.pop();
        return path;
    }
}
