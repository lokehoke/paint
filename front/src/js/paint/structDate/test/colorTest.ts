'use strict';

import 'mocha';
import { expect } from 'chai';

import { Color, RGB, HSV }  from '../color';

const colorStrings: Array<string> = [
    '#000000',
    '#ffffff',
    '#f2a305',
    '#f205a3',
    '#13f247',
    '#1442fa',
];

const colorRGB: Array<RGB> = [
    new RGB(0,   0,   0  ),
    new RGB(255, 255, 255),
    new RGB(242, 163, 5  ),
    new RGB(242, 5,   163),
    new RGB(19,  242, 71 ),
    new RGB(20,  66,  250),
];

const colorHSV: Array<HSV> = [
    new HSV(0,   0,     0  ),
    new HSV(0,   0,     1  ),
    new HSV(40,  0.98, 0.95),
    new HSV(320, 0.98, 0.95),
    new HSV(134, 0.92, 0.95),
    new HSV(228, 0.92, 0.98),
];

describe('Color test', () => {
    it('parse rgb string', () => {
        for (let s in colorStrings) {
            let c1: string = colorStrings[s];
            let rgb1: RGB = Color.parseRgbString(c1);
        }
    });

    it('rgb to hsv', () => {
        let c: Color = new Color();

        for (let s in colorStrings) {
            let str: string = colorStrings[s];
            let hsv: HSV   = colorHSV[s].getClone();
            let rgb: RGB   = colorRGB[s].getClone();

            c.setRGBString(str);
            expect(c.getHSV()).to.deep.equal(hsv);
            c.setRGB(rgb);
            expect(c.getHSV()).to.deep.equal(hsv);
        }
    });

    it('hsv to rgb', () => {
        let c: Color = new Color();

        for (let s in colorStrings) {
            let hsv: HSV   = colorHSV[s].getClone();
            let rgb: RGB   = colorRGB[s].getClone();

            c.setHSV(hsv);
            expect(c.getRGB()).to.deep.equal(rgb);
        }
    });

    it('rgb to hex string', () => {
        for (let s in colorRGB) {
            expect(Color.RGBToHEXString(colorRGB[s])).to.equal(colorStrings[s]);
        }
    });

    it('color to string', () => {
        for (let s in colorRGB) {
            let c: Color = new Color();
            c.setRGB(colorRGB[s]);
            expect(c.toString()).to.equal(`->RGB ` + c.getRGB().toString() + `\n->HEX ` + c.getRGBHEXString() + `\n->HSV ` + c.getHSV().toString());
        }
    });
});