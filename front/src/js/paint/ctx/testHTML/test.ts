'use strict';

import { CtxWrapper } from '../ctxWrapper';
import { ERightAngle } from '../algorithms/rotate';
import { def as defContext } from '../../reducers/ownReducers/instruments';

const height = 302;
const width = 605;

let root: HTMLElement = document.getElementById('root');
let img: HTMLImageElement = <HTMLImageElement>document.getElementById('img');

class TestDiv {
    static id: number = 0;

    constructor(title: string, func: (h: HTMLCanvasElement) => void) {
        let before: HTMLCanvasElement = this._getCanvas();
        before.style.marginRight = '10px';

        let after: HTMLCanvasElement = this._getCanvas();
        after.id = `${++TestDiv.id}`;

        let cnvBox: HTMLDivElement = document.createElement('div');
        cnvBox.style.display = 'flex';
        cnvBox.style.alignItems = 'center';
        cnvBox.appendChild(before);
        cnvBox.appendChild(after);

        let h1: HTMLHeadElement = document.createElement('h1');
        h1.textContent = title;

        let box: HTMLDivElement = document.createElement('div');
        box.appendChild(h1);
        box.appendChild(cnvBox);

        root.appendChild(box);

        func(after);
    }

    private _getCanvas(): HTMLCanvasElement {
        let cnv: HTMLCanvasElement = document.createElement('canvas');
        cnv.height = height;
        cnv.width = width;

        let ctx: CanvasRenderingContext2D = cnv.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        return cnv;
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    root.appendChild(img);
    img.addEventListener('load', () => {
        let test1 = new TestDiv('Test black and white', async (cnv: HTMLCanvasElement) => {
            let wrapper: CtxWrapper = new CtxWrapper(cnv, defContext);
            await wrapper.toBlackAndWhiteAsync();
        });

        let test2 = new TestDiv('Rotate 90 test', (cnv: HTMLCanvasElement) => {
            let wrapper: CtxWrapper = new CtxWrapper(cnv, defContext);
            wrapper.rotateRightAngle(ERightAngle.an90);
        });
    });
});
