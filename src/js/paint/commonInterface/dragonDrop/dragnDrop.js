'use strict';

const DefConfig = require('./defaultSetting.js');
const Coor = require('./../../structDate/coor.js');

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

    startDragonDroping() {
        this._startAsync();
        return this._deleteDrop;
    }

    async _startAsync() {
        if (this._config.startAsync) {
            await setTimeout(() => {}, 0);
        }

        this._item.addEventListener('dragstart', e => false);
        this._item.addEventListener('mousedown', this._mouseDowning);

        if (this._config.piece.exist) {
            this._findAbsPar();
            this._movingWithPiece({
                setUp: true
            });
            this._emptyPositions();
        }

        if (this._config.showAfterMount.isset) {
            this._item.style.display = this._config.showAfterMount.type;
        }
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
        this._coorMinPar = coor;
        if (this._config.piece.exist) {
            this._defineMaxParAndStep(par);
        }
    }

    _defineMaxParAndStep(el) {
        let sizeItem = this._getSizeItem();

        this._coorMaxPar.x = this._coorMinPar.x + el.offsetWidth - sizeItem.x;
        this._coorMaxPar.y = this._coorMinPar.y + el.offsetHeight - sizeItem.y;

        if (this._config.piece.exitFromContur) {
            this._coorMinPar.sub(sizeItem.divisionOnNumber(2));
            this._coorMaxPar.sum(sizeItem.divisionOnNumber(2));
        }

        this._steps.max = Coor.sub(this._config.piece.max, this._config.piece.min).divisionOnCoor(this._config.piece.step, 'int');
        this._stepPx = Coor.sub(this._coorMaxPar, this._coorMinPar).divisionOnCoor(this._steps.max);
    }

    _getSizeItem() {
        let sizeItem = new Coor();

        if (this._config.showAfterMount.isset) {
            if (this._config.showAfterMount.sizeItem) {
                sizeItem.setCoor(this._config.showAfterMount.sizeItem);
            } else {
                throw "need set sizeItem in showAfterMount";
            }
        } else {
            sizeItem.x = this._item.offsetWidth;
            sizeItem.y = this._item.offsetHeight;
        }

        return sizeItem;
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

        let partOfExitFromConturPx = this._getSizeItem().divisionOnNumber(2);
        let condOfExitFromContur = this._config.piece.exitFromContur;

        let dominateAxis = '';
        let changingSide = '';


        if (!this._config.onlyX) {
            dominateAxis = 'y';
            changingSide = 'top';
        } else if(!this._config.onlyY) {
            dominateAxis = 'x';
            changingSide = 'left';
        }

        let newStep = this._config.piece.cur[dominateAxis] / 2 - 1;

        if (!e.setUp) {
            let pageCoorOfMouse = new Coor(e.pageX, e.pageY);
            newStep = Math.ceil((pageCoorOfMouse[dominateAxis] - this._coorMinPar[dominateAxis]  - this._shiftOnItemPx[dominateAxis]) / this._stepPx[dominateAxis]);
        }

        assumptionOfNewPosition = newStep * this._stepPx[dominateAxis];

        if (assumptionOfNewPosition <= 0) {
            this._item.style[changingSide] = 0 - (condOfExitFromContur ? partOfExitFromConturPx[dominateAxis] : 0) + 'px';
            this._steps.current[dominateAxis] = 0;
        } else if (assumptionOfNewPosition >= this._coorMaxPar[dominateAxis] - this._coorMinPar[dominateAxis]) {
            this._item.style[changingSide] = this._steps.max[dominateAxis] * this._stepPx[dominateAxis] - (condOfExitFromContur ? partOfExitFromConturPx[dominateAxis] : 0) + 'px';
            this._steps.current[dominateAxis] = this._steps.max[dominateAxis];
        } else {
            this._item.style[changingSide] = assumptionOfNewPosition - (condOfExitFromContur ? partOfExitFromConturPx[dominateAxis] : 0) + 'px';
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
