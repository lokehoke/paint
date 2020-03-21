'use strict';

import DefaultConfig from './defaultSetting.js';
import Vector2 from './../../structDate/vector2.js';

export default class DragAndDrop {
    constructor(item, config = null) {
        this._item   = item;
        this._config = this._makeSetting(config);

        this._stepPx          = new Vector2();
        this._shiftOnItemPx   = new Vector2();
        this._vectorMinParent = new Vector2();
        this._vectorMaxParent = new Vector2();

        this._steps = {
            current: new Vector2(),
            max:     new Vector2(),
        };

        this._moveAt       = this._moveAt.bind(this);
        this._endMoving    = this._endMoving.bind(this);
        this._mouseDowning = this._mouseDowning.bind(this);
        this._deleteDrop   = this._deleteDrop.bind(this);
    }

    startDragAndDrop() {
        this._as_startAsync();
        return this._deleteDrop;
    }

    async _as_startAsync() {
        if (this._config.startAsync) {
            await new Promise(res => {
                setTimeout(() => {res()}, 0);
            });
        }

        this._item.addEventListener('dragstart', e => false);
        this._item.addEventListener('mousedown', this._mouseDowning);

        if (this._config.piece.exist) {
            this._findAbsParent();
            this._movingWithPiece({
                setUp: true,
            });
            this._emptyPositions();
        }

        if (this._config.showAfterMount.isset) {
            this._item.style.display = this._config.showAfterMount.type;
        }
    }

    _mouseDowning(e) {
        let item = this._item;

        if (!this._config.ignoreNoDragAndDrop && this._issetNoDrop(e.path)) {
            return true;
        } else {
            this._findAbsParent();
            let coords = this._getVector(item);

            this._shiftOnItemPx = Vector2.sub(new Vector2(e.pageX, e.pageY), coords);

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

    _getVector(elem) {
        let box = elem.getBoundingClientRect();
        return new Vector2(box.left, box.top);
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

    _findAbsParent() {
        let path = this._makeParentPath();
        let parent = path.find(el =>
            (el.style.position === 'absolute' || el.style.position === 'relative' || el.style.position === 'fixed')
        );
        parent = parent || document.body;
        let vector = this._getVector(parent);
        this._vectorMinParent = vector;
        if (this._config.piece.exist) {
            this._defineMaxParAndStep(parent);
        }
    }

    _defineMaxParAndStep(el) {
        let sizeItem = this._getSizeItem();

        this._vectorMaxParent.x = this._vectorMinParent.x + el.offsetWidth - sizeItem.x;
        this._vectorMaxParent.y = this._vectorMinParent.y + el.offsetHeight - sizeItem.y;

        if (this._config.piece.exitFromContour) {
            this._vectorMinParent.sub(sizeItem.divisionOnNumber(2));
            this._vectorMaxParent.sum(sizeItem.divisionOnNumber(2));
        }

        this._steps.max = Vector2.sub(this._config.piece.max, this._config.piece.min).divisionOnVector(this._config.piece.step, 'int');
        this._stepPx = Vector2.sub(this._vectorMaxParent, this._vectorMinParent).divisionOnVector(this._steps.max);
    }

    _getSizeItem() {
        let sizeItem = new Vector2();

        if (this._config.showAfterMount.isset) {
            if (this._config.showAfterMount.sizeItem) {
                sizeItem.setDimensions(this._config.showAfterMount.sizeItem);
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
            if (el.dataset.dragAndDrop === 'noDragAndDrop') {
                isset = true;
            }
        });
        return isset;
    }

    _movingWithPiece(e) {
        let assumptionOfNewPosition = 0.0;

        let partOfExitFromContourPx = this._getSizeItem().divisionOnNumber(2);
        let condOfExitFromContour = this._config.piece.exitFromContour;

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
            let pageVectorOfMouse = new Vector2(e.pageX, e.pageY);
            newStep = Math.ceil((pageVectorOfMouse[dominateAxis] - this._vectorMinParent[dominateAxis]  - this._shiftOnItemPx[dominateAxis]) / this._stepPx[dominateAxis]);
        }

        assumptionOfNewPosition = newStep * this._stepPx[dominateAxis];

        if (assumptionOfNewPosition <= 0) {
            this._item.style[changingSide] = 0 - (condOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0) + 'px';
            this._steps.current[dominateAxis] = 0;
        } else if (assumptionOfNewPosition >= this._vectorMaxParent[dominateAxis] - this._vectorMinParent[dominateAxis]) {
            this._item.style[changingSide] = this._steps.max[dominateAxis] * this._stepPx[dominateAxis] - (condOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0) + 'px';
            this._steps.current[dominateAxis] = this._steps.max[dominateAxis];
        } else {
            this._item.style[changingSide] = assumptionOfNewPosition - (condOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0) + 'px';
            this._steps.current[dominateAxis] = newStep;
        }

        this._config.transferDate({
            currentStep: (this._steps.current[dominateAxis] * this._config.piece.step[dominateAxis]) + this._config.piece.min[dominateAxis]
        });
    }

    _movingWithoutPiece(e) {
        if (!this._config.onlyX) {
            this._item.style.top = e.pageY - this._shiftOnItemPx.y - this._vectorMinParent.y + 'px';
        }

        if (!this._config.onlyY) {
            this._item.style.left = e.pageX - this._shiftOnItemPx.x - this._vectorMinParent.x + 'px';
        }
    }

    _makeSetting(config) {
        let defaults = new DefaultConfig();
        let reWrite = (obj, commonObject) => {
            if (typeof obj === 'object' && obj !== null && typeof commonObject === 'object' && commonObject !== null) {
                for (let value in commonObject) {
                    if (typeof commonObject[value] !== typeof obj[value]) {
                        continue;
                    } else if (typeof commonObject[value] !== 'object') {
                        commonObject[value] = obj[value];
                    } else {
                        reWrite(obj[value], commonObject[value]);
                    }
                }
            }
        }

        if (typeof config === 'object' && config !== null) {
			reWrite(config, defaults);
		}

        return defaults;
    }

    _makeParentPath() {
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