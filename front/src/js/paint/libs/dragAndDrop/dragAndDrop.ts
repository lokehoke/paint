'use strict';

import bind from 'bind-decorator';

import { ConfigDragAndDrop, ConfigDragAndDropType }  from './configDragAndDrop';
import { Vector2 } from '../../structDate/vector2';

interface ISteps {
    current: Vector2;
    max    : Vector2;
}

export interface ITransferDate {
    currentStep: number;
}

export class DragAndDrop {
    private _item           : HTMLElement           = null;
    private _config         : ConfigDragAndDropType = null;
    private _stepPx         : Vector2               = new Vector2();
    private _shiftOnItemPx  : Vector2               = new Vector2();
    private _vectorMinParent: Vector2               = new Vector2();
    private _vectorMaxParent: Vector2               = new Vector2();
    private _steps          : ISteps                = {current: new Vector2(), max: new Vector2()};

    constructor(item: HTMLElement = null, config: ConfigDragAndDropType = null) {
        this._item   = item;
        this._makeSetting(config);
    }

    startDragAndDrop(): () => void {
        this._as_startAsync();
        return this._deleteDrop;
    }

    private async _as_startAsync() {
        if (this._config.startAsync) {
            await new Promise(res => setTimeout(() => res(), 0));
        }

        this._item.addEventListener('dragstart', e => false);
        this._item.addEventListener('mousedown', this._mouseDowning);

        if (this._config.piece.exist) {
            this._findAbsParent();
            this._movingWithPiece(null, true);
            this._emptyPositions();
        }

        if (this._config.showAfterMount.isset) {
            this._item.style.display = this._config.showAfterMount.type;
        }
    }

    @bind
    private _mouseDowning(e: MouseEvent): void {

        let item: HTMLElement = this._item;

        if (this._config.ignoreNoDragAndDrop || !this._issetNoDrop(e.path)) { //TODO WoRK only in chrome
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

    @bind
    private _deleteDrop(): void {
        this._item.removeEventListener('mousedown', this._mouseDowning);
    }

    private _getVector(elem: HTMLElement): Vector2 {
        let box = elem.getBoundingClientRect();
        return new Vector2(box.left, box.top);
    }

    @bind
    private _moveAt(e: MouseEvent): void {
        if (this._config.piece.exist) {
            this._movingWithPiece(e);
        } else {
            this._movingWithoutPiece(e);
        }
    }

    @bind
    private _endMoving(): void {
        document.removeEventListener('mousemove', this._moveAt);
        document.removeEventListener('mouseup', this._endMoving);
    }

    private _emptyPositions(): void {
        if (!this._config.onlyX) {
            this._item.style.bottom = 'auto';
        }

        if (!this._config.onlyY) {
            this._item.style.right = 'auto';
        }
    }

    private _findAbsParent(): void {
        let path  : Array<HTMLElement> = this._makeParentPath();
        let parent: HTMLElement        = path.find((el: HTMLElement) => (
            el.style.position === 'absolute'||
            el.style.position === 'relative'||
            el.style.position === 'fixed'
        ));

        parent = parent || document.body;
        let vector: Vector2 = this._getVector(parent);
        this._vectorMinParent = vector;

        if (this._config.piece.exist) {
            this._defineMaxParAndStep(parent);
        }
    }

    private _defineMaxParAndStep(el: HTMLElement): void {
        let sizeItem: Vector2 = this._getSizeItem();

        this._vectorMaxParent.x = this._vectorMinParent.x + el.offsetWidth - sizeItem.x;
        this._vectorMaxParent.y = this._vectorMinParent.y + el.offsetHeight - sizeItem.y;

        if (this._config.piece.exitFromContour) {
            this._vectorMinParent.sub(Vector2.divisionOnNumber(sizeItem, 2));
            this._vectorMaxParent.sum(Vector2.divisionOnNumber(sizeItem, 2));
        }

        this._steps.max = Vector2.sub(this._config.piece.max, this._config.piece.min).divisionOnVector(this._config.piece.step, 'int');
        this._stepPx    = Vector2.sub(this._vectorMaxParent, this._vectorMinParent).divisionOnVector(this._steps.max);
    }

    private _getSizeItem(): Vector2 {
        let sizeItem: Vector2 = new Vector2();

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

    private _issetNoDrop(path: Array<HTMLElement>): boolean {
        let isset: boolean = false;
        path.slice(0, -6).forEach((el: HTMLElement) => {
            if (el.dataset.dragAndDrop === 'noDragAndDrop') {
                isset = true;
            }
        });
        return isset;
    }

    private _movingWithPiece(e: MouseEvent, setUp: boolean = false): void {
        let assumptionOfNewPosition: number = 0.0;

        let partOfExitFromContourPx   : Vector2 = this._getSizeItem().divisionOnNumber(2);
        let conditionOfExitFromContour: boolean = this._config.piece.exitFromContour;

        let dominateAxis: string = '';
        let changingSide: string = '';


        if (!this._config.onlyX) {
            dominateAxis = 'y';
            changingSide = 'top';
        } else if(!this._config.onlyY) {
            dominateAxis = 'x';
            changingSide = 'left';
        }

        let newStep: number = this._config.piece.cur[dominateAxis] / 2 - 1;

        if (!setUp) {
            let pageVectorOfMouse: Vector2 = new Vector2(e.pageX, e.pageY);
            newStep = Math.ceil((pageVectorOfMouse[dominateAxis] - this._vectorMinParent[dominateAxis]  - this._shiftOnItemPx[dominateAxis]) / this._stepPx[dominateAxis]);
        }

        assumptionOfNewPosition = newStep * this._stepPx[dominateAxis];


        if (assumptionOfNewPosition <= 0) {
            this._item.style[changingSide]    = `${0 - (conditionOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0)}px`;
            this._steps.current[dominateAxis] = 0;
        } else if (assumptionOfNewPosition >= this._vectorMaxParent[dominateAxis] - this._vectorMinParent[dominateAxis]) {
            this._item.style[changingSide]    = `${this._steps.max[dominateAxis] * this._stepPx[dominateAxis] - (conditionOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0)}px`;
            this._steps.current[dominateAxis] = this._steps.max[dominateAxis];
        } else {
            this._item.style[changingSide]    = assumptionOfNewPosition - (conditionOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0) + 'px';
            this._steps.current[dominateAxis] = newStep;
        }

        let transferData: ITransferDate = {
            currentStep: (this._steps.current[dominateAxis] * this._config.piece.step[dominateAxis]) + this._config.piece.min[dominateAxis]
        }

        this._config.transferDate(transferData);
    }

    private _movingWithoutPiece(e: MouseEvent): void {
        if (!this._config.onlyX) {
            this._item.style.top = `${e.pageY - this._shiftOnItemPx.y - this._vectorMinParent.y}px`;
        }

        if (!this._config.onlyY) {
            this._item.style.left = `${e.pageX - this._shiftOnItemPx.x - this._vectorMinParent.x}px`;
        }
    }

    private _makeSetting(config: ConfigDragAndDropType): void {
        let defaults: ConfigDragAndDrop  = new ConfigDragAndDrop();

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

        this._config = defaults;
    }

    private _makeParentPath(): Array<HTMLElement> {
        let path   : Array<HTMLElement> = [];
        let curItem: HTMLElement        = this._item;

        while(curItem.parentNode) {
            path.push(curItem = curItem.parentNode as HTMLElement);
        }

        path.pop();
        return path;
    }
}