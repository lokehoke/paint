'use strict';

module.exports = class BrushMode {
    constructor(instrumentary) {
        this._type = 'brush';
        this._color = instrumentary.currentColor;
        this._lineThickness = instrumentary.currentLineThickness;
    }

    setListeners(canv, ctx) {
        let mouseDown = () => {
            ctx.lineWidth = this._lineThickness;
            ctx.fillStyle = this._color;

            let moving = e => {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(e.offsetX, e.offsetY, this._lineThickness / 2, 0, 2 * Math.PI);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(e.offsetX, e.offsetY);
            }

            let downing = () => {
                canv.removeEventListener('mousemove', moving);
                canv.removeEventListener('mouseup', downing);
                ctx.beginPath();
            }

            canv.addEventListener('mousemove', moving);
            canv.addEventListener('mouseup', downing);
        };

        canv.addEventListener('mousedown', mouseDown);

        return () => {
            canv.removeEventListener('mousedown', mouseDown);
        }
    }
}
