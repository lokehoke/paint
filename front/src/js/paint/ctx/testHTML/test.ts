'use strict';

import { CtxWrapper } from '../ctxWrapper';
import { ERightAngle } from '../algorithms/rotate';
import { def as defContext } from '../../reducers/ownReducers/instruments';

const height = 302;
const width = 605;

const root: HTMLElement = document.getElementById('root');
const img: HTMLImageElement = document.getElementById('img') as HTMLImageElement;

class TestDiv {
    static id = 0;

    constructor(title: string, func: (h: HTMLCanvasElement) => void) {
        const before: HTMLCanvasElement = this._getCanvas();
        before.style.marginRight = '10px';

        const after: HTMLCanvasElement = this._getCanvas();
        after.id = `${++TestDiv.id}`;

        const cnvBox: HTMLDivElement = document.createElement('div');
        cnvBox.style.display = 'flex';
        cnvBox.style.alignItems = 'center';
        cnvBox.appendChild(before);
        cnvBox.appendChild(after);

        const h1: HTMLHeadElement = document.createElement('h1');
        h1.textContent = title;

        const box: HTMLDivElement = document.createElement('div');
        box.appendChild(h1);
        box.appendChild(cnvBox);

        root.appendChild(box);

        func(after);
    }

    private _getCanvas(): HTMLCanvasElement {
        const cnv: HTMLCanvasElement = document.createElement('canvas');
        cnv.height = height;
        cnv.width = width;

        const ctx: CanvasRenderingContext2D = cnv.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        return cnv;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    root.appendChild(img);
    img.addEventListener('load', () => {
        new TestDiv('Test black and white', async (cnv: HTMLCanvasElement) => {
            const wrapper: CtxWrapper = new CtxWrapper(cnv, defContext);
            await wrapper.toBlackAndWhiteAsync();
        });

        new TestDiv('Rotate 90 test', (cnv: HTMLCanvasElement) => {
            const wrapper: CtxWrapper = new CtxWrapper(cnv, defContext);
            wrapper.rotateRightAngle(ERightAngle.an90);
        });
    });
});
