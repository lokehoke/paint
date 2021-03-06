'use strict';

//TODO current in piece not work!!!
//TODO some piece not show

import bind from 'bind-decorator';

import { ConfigDragAndDrop, ConfigDragAndDropType } from './configDragAndDrop';
import { Vector2 } from '../../structDate/vector2';

interface ISteps {
    current: Vector2;
    max: Vector2;
}

export interface IExportDate {
    currentStep: number;
}

export class DragAndDrop {
    private _item: HTMLElement = null;
    private _config: ConfigDragAndDropType = null;
    private _stepPx = new Vector2();
    private _shiftOnItemPx = new Vector2();
    private _vectorMinParent = new Vector2();
    private _vectorMaxParent = new Vector2();
    private _steps: ISteps = { current: new Vector2(), max: new Vector2() };

    constructor(item: HTMLElement = null, config: ConfigDragAndDropType = null) {
        this._item = item;
        this._makeSetting(config);
    }

    startDragAndDrop(): () => void {
        this._startAsync();
        return this._deleteDrop;
    }

    private async _startAsync(): Promise<void> {
        if (this._config.startAsync) {
            await new Promise((res) => setTimeout(() => res()));
        }

        this._item.addEventListener('dragstart', () => false);
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
        const item: HTMLElement = this._item;
        const target: HTMLElement = e.target as HTMLElement;
        const path: Array<HTMLElement> = [target, ...this._makeParentPath(target)];

        if (this._config.ignoreNoDragAndDrop || !this._issetNoDrop(path)) {
            this._findAbsParent();
            const coords = this._getVector(item);

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
        const box = elem.getBoundingClientRect();
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
        const path: Array<HTMLElement> = this._makeParentPath(this._item);
        let parent: HTMLElement = path.find(
            (el: HTMLElement) =>
                el.style.position === 'absolute' || el.style.position === 'relative' || el.style.position === 'fixed',
        );

        parent = parent || document.body;
        const vector: Vector2 = this._getVector(parent);
        this._vectorMinParent = vector;

        if (this._config.piece.exist) {
            this._defineMaxParAndStep(parent);
        }
    }

    private _defineMaxParAndStep(el: HTMLElement): void {
        const sizeItem: Vector2 = this._getSizeItem();

        this._vectorMaxParent.x = this._vectorMinParent.x + el.offsetWidth - sizeItem.x;
        this._vectorMaxParent.y = this._vectorMinParent.y + el.offsetHeight - sizeItem.y;

        if (this._config.piece.exitFromContour) {
            this._vectorMinParent.sub(Vector2.divisionOnNumber(sizeItem, 2));
            this._vectorMaxParent.sum(Vector2.divisionOnNumber(sizeItem, 2));
        }

        this._steps.max = Vector2.sub(this._config.piece.max, this._config.piece.min).divisionOnVector(
            this._config.piece.step,
            'int',
        );
        this._stepPx = Vector2.sub(this._vectorMaxParent, this._vectorMinParent).divisionOnVector(this._steps.max);
    }

    private _getSizeItem(): Vector2 {
        const sizeItem: Vector2 = new Vector2();

        if (this._config.showAfterMount.isset) {
            if (this._config.showAfterMount.sizeItem) {
                sizeItem.setDimensions(this._config.showAfterMount.sizeItem);
            } else {
                throw 'need set sizeItem in showAfterMount'; // TODO need error class
            }
        } else {
            sizeItem.x = this._item.offsetWidth;
            sizeItem.y = this._item.offsetHeight;
        }

        return sizeItem;
    }

    private _issetNoDrop(path: Array<HTMLElement>): boolean {
        return path.some((el: HTMLElement) => {
            return el.dataset.dragAndDrop === 'noDragAndDrop';
        });
    }

    private _movingWithPiece(e: MouseEvent, setUp = false): void {
        let assumptionOfNewPosition = 0.0;

        const partOfExitFromContourPx: Vector2 = this._getSizeItem().divisionOnNumber(2);
        const conditionOfExitFromContour: boolean = this._config.piece.exitFromContour;

        let dominateAxis = '';
        let changingSide = '';

        if (!this._config.onlyX) {
            dominateAxis = 'y';
            changingSide = 'top';
        } else if (!this._config.onlyY) {
            dominateAxis = 'x';
            changingSide = 'left';
        }

        let newStep: number = this._config.piece.cur[dominateAxis] / 2 - 1;

        if (!setUp) {
            const pageVectorOfMouse: Vector2 = new Vector2(e.pageX, e.pageY);
            newStep = Math.ceil(
                (pageVectorOfMouse[dominateAxis] -
                    this._vectorMinParent[dominateAxis] -
                    this._shiftOnItemPx[dominateAxis]) /
                    this._stepPx[dominateAxis],
            );
        }

        assumptionOfNewPosition = newStep * this._stepPx[dominateAxis];

        if (assumptionOfNewPosition <= 0) {
            this._item.style[changingSide] = `${
                0 - (conditionOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0)
            }px`;
            this._steps.current[dominateAxis] = 0;
        } else if (
            assumptionOfNewPosition >=
            this._vectorMaxParent[dominateAxis] - this._vectorMinParent[dominateAxis]
        ) {
            this._item.style[changingSide] = `${
                this._steps.max[dominateAxis] * this._stepPx[dominateAxis] -
                (conditionOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0)
            }px`;
            this._steps.current[dominateAxis] = this._steps.max[dominateAxis];
        } else {
            this._item.style[changingSide] =
                assumptionOfNewPosition -
                (conditionOfExitFromContour ? partOfExitFromContourPx[dominateAxis] : 0) +
                'px';
            this._steps.current[dominateAxis] = newStep;
        }

        const transferData: IExportDate = {
            currentStep:
                this._steps.current[dominateAxis] * this._config.piece.step[dominateAxis] +
                this._config.piece.min[dominateAxis],
        };

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
        const defaults: ConfigDragAndDrop = new ConfigDragAndDrop();

        const reWrite = (obj, commonObject) => {
            if (typeof obj === 'object' && obj !== null && typeof commonObject === 'object' && commonObject !== null) {
                for (const value in commonObject) {
                    if (typeof commonObject[value] !== typeof obj[value]) {
                        continue;
                    } else if (typeof commonObject[value] !== 'object') {
                        commonObject[value] = obj[value];
                    } else {
                        reWrite(obj[value], commonObject[value]);
                    }
                }
            }
        };

        if (typeof config === 'object' && config !== null) {
            reWrite(config, defaults);
        }

        this._config = defaults;
    }

    private _makeParentPath(item: HTMLElement): Array<HTMLElement> {
        const path: Array<HTMLElement> = [];
        let curItem: HTMLElement = item;

        while (curItem.parentNode) {
            path.push((curItem = curItem.parentNode as HTMLElement));
        }

        path.pop();
        return path;
    }
}
