'use strict';

export default class BrushMode {
    constructor(instrumentary) {
        this._type = 'brush';
        this._color = instrumentary.currentColor;
        this._lineThickness = instrumentary.currentLineThickness;
    }

    setListeners(canv, ctx) {
        let checkCanvTarget = target => {
            return (target === canv);
        };

        let click = e => {
            if (!checkCanvTarget(e.target)) {
                ctx.beginPath();
                return false;
            }

            ctx.beginPath();
            ctx.fill();
            ctx.beginPath();
        };

        let mouseDown = (e) => {
            if (!checkCanvTarget(e.target)) {
                return false;
            }

            ctx.lineWidth = this._lineThickness;
            ctx.fillStyle = this._color;
            ctx.strokeStyle = this._color;
            ctx.lineCap = 'round';

            let moving = e => {
                if (!checkCanvTarget(e.target)) {
                    ctx.beginPath();
                    return false;
                }

                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();

                click(e);

                ctx.moveTo(e.offsetX, e.offsetY);
            };

            let downing = () => {
                document.removeEventListener('mousemove', moving);
                document.removeEventListener('mouseup', downing);
                ctx.beginPath();
            };

            document.addEventListener('mousemove', moving);
            document.addEventListener('mouseup', downing);
            return true;
        };

        document.addEventListener('click', click);
        document.addEventListener('mousedown', mouseDown);

        return () => {
            document.removeEventListener('mousedown', mouseDown);
            document.removeEventListener('click', click);
        }
    }
}