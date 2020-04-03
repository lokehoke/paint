'use strict';

// docs in russian with formulas
// https://ru.wikipedia.org/wiki/HSV_(%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C)

export class ColorValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ColorValidationError";
    }
}

export class ColorParseError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ColorParseError";
    }
}

export enum ETypeColorModel{
    RGB = 'rgb',
    HSV = 'hsv',
}

export class HSV {
    hue       : number = 0; /* 0...359 */
    saturation: number = 0; /* 0...1   */
    brightness: number = 0; /* 0...1   */

    readonly type: ETypeColorModel = ETypeColorModel.HSV;

    constructor(h: number = 0, s: number = 0, v: number = 0) {
        this.hue        = h;
        this.saturation = s;
        this.brightness = v;
    }

    toString(): string {
        return `{ hue: ${this.hue} saturation: ${this.saturation} brightness: ${this.brightness} }`;
    }

    getClone(): HSV {
        return new HSV(this.hue, this.saturation, this.brightness);
    }
}

export class RGB {
    red  : number = 0; /* 0...255 */
    green: number = 0; /* 0...255 */
    blue : number = 0; /* 0...255 */

    readonly type: ETypeColorModel = ETypeColorModel.RGB;

    constructor(r: number = 0, g: number = 0, b: number = 0) {
        this.red   = r;
        this.green = g;
        this.blue  = b;
    }

    toString(): string {
        return `{ red: ${this.red} green: ${this.green} blue: ${this.blue} }`;
    }

    getClone(): RGB {
        return new RGB(this.red, this.green, this.blue);
    }
}


export interface IColor {
    hsv: HSV,
    rgb: RGB,
};

export const LimitsMin: IColor = {
    rgb: new RGB(0, 0, 0),
    hsv: new HSV(0, 0, 0),
};

export const LimitsMax: IColor = {
    rgb: new RGB(255, 255, 255),
    hsv: new HSV(355, 1, 1),
};

export class Color {
    readonly accuracy: number = 3;
    readonly factor  : number = 100;

    private _color: IColor = {
        rgb: LimitsMin.rgb.getClone(),
        hsv: LimitsMin.hsv.getClone(),
    };

    static parseRgbString(rgb: string): RGB {
        rgb = rgb.substr(1, rgb.length - 1);
        if (rgb.length === 3) {
            return new RGB(
                parseInt(`${rgb[0]}${rgb[0]}`, 16),
                parseInt(`${rgb[1]}${rgb[1]}`, 16),
                parseInt(`${rgb[2]}${rgb[2]}`, 16),
            );
        } else if (rgb.length === 6) {
            return new RGB(
                parseInt(`${rgb[0]}${rgb[1]}`, 16),
                parseInt(`${rgb[2]}${rgb[3]}`, 16),
                parseInt(`${rgb[4]}${rgb[5]}`, 16),
            );
        } else {
            throw new ColorParseError(`string ${rgb} is not color, length = ${rgb.length}`);
        }
    }

    static RGBToHEXString(rgb: RGB): string {
        let str: string = '#';
        let array: Array<string> = [rgb.red.toString(16), rgb.green.toString(16), rgb.blue.toString(16)];
        for (let s of array) {
            let num: number = +s;
            str += (num < 10 ? `0${s}` : s);
        }
        return str;
    }

    static HSVToRGB(hsv: HSV): RGB {
        let h: number = hsv.hue;
        let v: number = hsv.brightness * 100;
        let s: number = hsv.saturation * 100;

        let hi: number = Math.floor(h / 60) % 6;

        let vMin: number = (100 - s) * v / 100;
        let a: number = (v - vMin) * (h % 60) / 60;
        let vInc: number = vMin + a;
        let vDec: number = v - a;

        v *= 2.55;
        vInc *= 2.55;
        vMin *= 2.55;
        vDec *= 2.55;

        switch (hi) {
            case 0:
                return new RGB(v, vInc, vMin);

            case 1:
                return new RGB(vDec, v, vMin);

            case 2:
                return new RGB(vMin, v, vInc);

            case 3:
                return new RGB(vMin, vDec, v);

            case 4:
                return new RGB(vInc, vMin, v);

            case 5:
                return new RGB(v, vMin, vDec);
        }
    }

    static RGBToHSV(rgb: RGB): HSV {
        let hsv: HSV = new HSV();
        let r = rgb.red / 255;
        let g = rgb.green / 255;
        let b = rgb.blue / 255;

        let max: number = Math.max(r, g, b);
        let min: number = Math.min(r, g, b);

        hsv.brightness = max;
        hsv.saturation = (max === 0 ? 0 : 1 - (max === 0 ? 0 : min / max));

        let mm: number = max - min;

        if (max === min) {
            hsv.hue = 0;
        } else if (max === r && g >= b) {
            hsv.hue = 60 * (g - b) / mm;
        } else if (max === r && g < b) {
            hsv.hue = 60 * (g - b) / mm + 360;
        } else if (max === g) {
            hsv.hue = 60 * (b - r) / mm + 120;
        } else if (max === b) {
            hsv.hue = 60 * (r - g) / mm + 240;
        }
        return hsv;
    }

    constructor(accuracy: number = 3) {
        this.accuracy = accuracy;
        this.factor   = 10 ** accuracy;
    }

    setHSV(c: HSV): void {
        if (this._colorIsValid(c)) {
            this._color.hsv = c;
            this._HSVToRGB();
            this._roundAll();
        } else {
            throw new ColorValidationError(`HSV is invalid: ${c}`);
        }
    }

    setRGB(c: RGB): void {
        if (this._colorIsValid(c)) {
            this._color.rgb = c;
            this._RGBToHSV();
            this._roundAll();

        } else {
            throw new ColorValidationError(`RGB is invalid: ${c}`);
        }
    }

    setRGBString(c: string): void {
        this.setRGB(Color.parseRgbString(c));
    }

    getHSV(): HSV {
        return this._color.hsv.getClone();
    }

    getRGB(): RGB {
        return this._color.rgb.getClone();
    }
	 
	toString(): string {
        return`
->RGB ${this._color.rgb}
->HEX ${ this.getRGBHEXString()}
-> HSV ${ this.getHSV()}`;
    }
	
    getRGBHEXString(): string {
        return Color.RGBToHEXString(this._color.rgb);
    }

    getDeepClone(): Color {
        let color: Color = new Color(this.accuracy);
        color.setHSV(this._color.hsv);
        return color;
    }

    private _HSVToRGB(): void {
        this._color.rgb = Color.HSVToRGB(this._color.hsv);
    }

    private _RGBToHSV(): void {
        this._color.hsv = Color.RGBToHSV(this._color.rgb);
    }

    private _colorIsValid(v: HSV | RGB): boolean {
        let type: ETypeColorModel = v.type;

        for (let key in v) {
            if (v[key] > LimitsMax[type][key] || v[key] < LimitsMin[type][key]) {
                return false;
            }
        }

        return true;
    }

    private _roundAll(): void {
        let a: number = this.factor;

        this._color.hsv.hue        = Math.round(this._color.hsv.hue);
        this._color.hsv.saturation = Math.round(this._color.hsv.saturation * a) / a;
        this._color.hsv.brightness = Math.round(this._color.hsv.brightness * a) / a;

        this._color.rgb.red   = Math.round(this._color.rgb.red);
        this._color.rgb.green = Math.round(this._color.rgb.green);
        this._color.rgb.blue  = Math.round(this._color.rgb.blue);
    }
}