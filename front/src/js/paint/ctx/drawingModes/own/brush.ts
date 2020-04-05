'use strict';

import { EInstrumentMode, IModeType } from '../modes';
import { IModeContext } from '../../../reducers/ownReducers/instruments';
import bind from 'bind-decorator';

export class BrushMode implements IModeType {
    private _context: IModeContext;
    private _canvas: HTMLCanvasElement;

    type: EInstrumentMode = EInstrumentMode.brush;

    setListeners(canv: HTMLCanvasElement): void {
        this._canvas = canv;
        document.addEventListener('click', this._click);
        document.addEventListener('mousedown', this._mouseDown);
    }

    updateContext(context: IModeContext): void {
        this._context = context;
    }

    deleteListeners(): void {
        document.removeEventListener('mousedown', this._mouseDown);
        document.removeEventListener('click', this._click);
    }

    @bind
    private _checkCanvTarget(target: EventTarget): boolean {
        return (target as HTMLElement) === this._canvas;
    }

    @bind
    private _click(e: MouseEvent): boolean {
        const ctx: CanvasRenderingContext2D = this._canvas.getContext('2d');
        if (!this._checkCanvTarget(e.target)) {
            ctx.beginPath();
            return false;
        }

        ctx.beginPath();
        ctx.fill();
        ctx.beginPath();
        return true;
    }

    @bind
    private _mouseDown(e: MouseEvent): boolean {
        const ctx: CanvasRenderingContext2D = this._canvas.getContext('2d');
        if (!this._checkCanvTarget(e.target)) {
            return false;
        }

        ctx.lineWidth = this._context.currentLineThickness;
        ctx.fillStyle = this._context.currentColor.getRGBHexString();
        ctx.strokeStyle = this._context.currentColor.getRGBHexString();
        ctx.lineCap = 'round';

        document.addEventListener('mousemove', this._moving);
        document.addEventListener('mouseup', this._downing);
        return true;
    }

    @bind
    private _moving(e: MouseEvent): boolean {
        const ctx: CanvasRenderingContext2D = this._canvas.getContext('2d');
        if (!this._checkCanvTarget(e.target)) {
            ctx.beginPath();
            return false;
        }

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        this._click(e);

        ctx.moveTo(e.offsetX, e.offsetY);
        return true;
    }

    @bind
    private _downing(): void {
        const ctx: CanvasRenderingContext2D = this._canvas.getContext('2d');
        document.removeEventListener('mousemove', this._moving);
        document.removeEventListener('mouseup', this._downing);
        ctx.beginPath();
    }
}
