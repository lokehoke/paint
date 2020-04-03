'use string';

import { EBlackAndWhiteMode, BlackAndWhiteTransducer } from './algorithms/blackAndWhite';
import { ERightAngle, RotateTransducers } from './algorithms/rotate';
import { EInstrumentMode, IModeType, Modes } from './drawingModes/modes';
import { IModeContext } from '../reducers/ownReducers/instruments'

export class CtxWrapperAlreadyActive extends Error {
    constructor(message: string) {
      super(message);
      this.name = "CtxWrapperAlreadyActive";
    }
}

export class CtxWrapperNoActive extends Error {
    constructor(message: string) {
      super(message);
      this.name = "CtxWrapperNoActive";
    }
}

export class CtxWrapper {
    private _ctx   : CanvasRenderingContext2D;
    private _height: number;
    private _width : number;
    private _data  : ImageData;

    private _mode       : IModeType;
    private _modeContext: IModeContext;

    private _active: boolean = false;

    constructor(canvas: HTMLCanvasElement, modeContext: IModeContext) {
        this._ctx = canvas.getContext('2d');
        this._height = canvas.height;
        this._width = canvas.width;
        this._data = this._ctx.getImageData(0, 0, this._width, this._height);

        this._mode = Modes.getMode(modeContext.activeInstrument);
        this._mode.updateContext(this._modeContext);
    }

    isActive() {
        return this._active;
    }

    activeCtxWrapper(): void {
        if (!this._active) {
            this._ctx.fillStyle = 'white';
            this._ctx.fillRect(0, 0, this._width, this._height);

            this._mode.setListeners(this._ctx.canvas);
            this._active = true;
        } else {
            throw new CtxWrapperAlreadyActive('CtxWrapper already active!');
        }
    }

    deactivateCtxWrapper(): void {
        if (this._active) {
            this._mode.deleteListeners();
        } else {
            throw new CtxWrapperNoActive('CtxWrapper not active!');
        }
    }

    updateModeContext(modeContext: IModeContext): void {
        this._modeContext = modeContext;
        this._mode.updateContext(modeContext);
    }

    async as_toBlackAndWhite(mode: EBlackAndWhiteMode = EBlackAndWhiteMode.average): Promise<CtxWrapper> {
        await BlackAndWhiteTransducer.as_do(this._data, mode);
        this._ctx.putImageData(this._data, 0, 0);
        return this;
    }

    rotateRightAngle(angle: ERightAngle): CtxWrapper { //TODO
        if (angle == ERightAngle.an0 || angle == ERightAngle.an180) {

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