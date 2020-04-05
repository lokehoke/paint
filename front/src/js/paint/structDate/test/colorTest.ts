'use strict';

import 'mocha';
import { expect } from 'chai';

import { Color, RGB, HSV } from '../color';

const colorStrings: Array<string> = ['#000000', '#ffffff', '#f2a305', '#f205a3', '#13f247', '#1442fa'];

const colorRGB: Array<RGB> = [
    new RGB(0, 0, 0),
    new RGB(255, 255, 255),
    new RGB(242, 163, 5),
    new RGB(242, 5, 163),
    new RGB(19, 242, 71),
    new RGB(20, 66, 250),
];

const colorHSV: Array<HSV> = [
    new HSV(0, 0, 0),
    new HSV(0, 0, 1),
    new HSV(40, 0.979, 0.949),
    new HSV(320, 0.979, 0.949),
    new HSV(134, 0.921, 0.949),
    new HSV(228, 0.92, 0.98),
];

describe('Color test', () => {
    it('parse rgb string', () => {
        for (const s in colorStrings) {
            const c1 = colorStrings[s];
            const rgb1 = Color.parseRgbString(c1);
            expect(rgb1).to.deep.equal(colorRGB[s]);
        }
    });

    it('rgb to hsv', () => {
        const c = new Color();

        for (const s in colorStrings) {
            const str: string = colorStrings[s];
            const hsv: HSV = colorHSV[s].getClone();
            const rgb: RGB = colorRGB[s].getClone();

            c.setRGBString(str);
            expect(c.getHSV()).to.deep.equal(hsv);
            c.setRGB(rgb);
            expect(c.getHSV()).to.deep.equal(hsv);
        }
    });

    it('hsv to rgb', () => {
        const c: Color = new Color();

        for (const s in colorStrings) {
            const hsv: HSV = colorHSV[s].getClone();
            const rgb: RGB = colorRGB[s].getClone();

            c.setHSV(hsv);
            expect(c.getRGB()).to.deep.equal(rgb);
        }
    });

    it('rgb to hex string', () => {
        for (const s in colorRGB) {
            const c = new Color();
            c.setRGB(colorRGB[s]);
            expect(Color.RGBToHEXString(colorRGB[s])).to.equal(colorStrings[s]);
            expect(c.getRGBHexString()).to.equal(colorStrings[s]);
        }
    });
});
