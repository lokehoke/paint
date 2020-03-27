'use string';

import { Mode as BlackAndWitheMode, BlackAndWhiteTransducer } from "./algorithms/blackAndWhite";
import { IRightAngle, RotateTransducers } from "./algorithms/rotate";

export class CtxWrapper {
    private _ctx   : CanvasRenderingContext2D;
    private _height: number;
    private _width : number;
    private _data  : ImageData;

    constructor(canvas: HTMLCanvasElement) {
        this._ctx = canvas.getContext('2d');
        this._height = canvas.height;
        this._width = canvas.width;
        this._data = this._ctx.getImageData(0, 0, this._width, this._height);
    }

    async as_toBlackAndWhite(mode: BlackAndWitheMode = BlackAndWitheMode.average): Promise<CtxWrapper> {
        await BlackAndWhiteTransducer.as_do(this._data, mode);
        this._ctx.putImageData(this._data, 0, 0);
        return this;
    }

    rotateRightAngle(angle: IRightAngle): CtxWrapper { //TODO
        if (angle == IRightAngle.an0 || angle == IRightAngle.an180) {

        } else {
            [this._height, this._width] = [this._width, this._height];
            RotateTransducers.do(this._data, angle);
            this._data = new ImageData(this._data.data, this._width, this._height);
            this._ctx.canvas.height = this._height;
            this._ctx.canvas.width  = this._width;
            this._ctx.putImageData(this._data, 0, 0);
        }

        return this;
    }
};