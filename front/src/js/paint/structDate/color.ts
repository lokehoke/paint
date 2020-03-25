'use strict';

// docs in russian with formulas
// https://ru.wikipedia.org/wiki/HSV_(%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C)

export class ColorValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ColorValidationError";
    }
}

export interface IHSV {
    hue       : number, /* 0...359 */
    saturation: number, /* 0...1   */
    brightness: number, /* 0...1   */
}

export interface IRGB {
    red  : number, /* 0...255 */
    green: number, /* 0...255 */
    blue : number, /* 0...255 */
}

export interface IColor {
    hsv: IHSV,
    rgb: IRGB,
};

export const LimitsMin: IColor = {
    rgb: {
        red  : 0,
        green: 0,
        blue : 0,
    },
    hsv: {
        hue       : 0,
        saturation: 0,
        brightness: 0,
    },
};

export const LimitsMax: IColor = {
    rgb: {
        red  : 255,
        green: 255,
        blue : 255,
    },
    hsv: {
        hue       : 355,
        saturation: 1,
        brightness: 1,
    },
};


export class Color {
    private _color: IColor;

    constructor() {}

    setHSV(c: IHSV): void {
        if (this._colorIsValid(c, 'hsv')) {
            this._color.hsv = c;
            this._HSVToRGB();
        } else {
            throw new ColorValidationError("HSV is invalid");
        }
    }

    setRGB(c: IRGB): void {
        if (this._colorIsValid(c, 'rgb')) {
            this._color.rgb = c;
            this._RGBToHSV();
        } else {
            throw new ColorValidationError("RGB is invalid");
        }
    }

    getHSV(): IHSV {
        return this._color.hsv;
    }

    getRGB(): IRGB {
        return this._color.rgb;
    }

    static HSVToRGB(hsv: IHSV): IRGB {
        let c: Color = new Color();
        c.setHSV(hsv);
        return c.getRGB();
    }

    static RGBToHSV(rgb: IRGB): IHSV {
        let c: Color = new Color();
        c.setRGB(rgb);
        return c.getHSV();
    }

    private _HSVToRGB(): void {
        let hsv: IHSV = this._color.hsv;

        let h: number = hsv.hue;
        let v: number = hsv.brightness * 100;
        let s: number = hsv.saturation * 100;

        let hi: number = Math.floor(h / 60) % 6;

        let vMin: number = (100-s) * v / 100;
        let a: number = (v - vMin) * (h % 60) / 60;
        let vInc: number = vMin + a;
        let vDec: number = v - a;

        switch(hi) {
            case 0:
                this._color.rgb = {
                    red: v,
                    green: vInc,
                    blue: vMin,
                };
                break;

            case 1:
                this._color.rgb = {
                    red: vDec,
                    green: v,
                    blue: vMin,
                };
                break;

            case 2:
                this._color.rgb = {
                    red: vMin,
                    green: v,
                    blue: vInc,
                };
                break;

            case 3:
                this._color.rgb = {
                    red: vMin,
                    green: vDec,
                    blue: v,
                };
                break;

            case 4:
                this._color.rgb = {
                    red: vInc,
                    green: vMin,
                    blue: v,
                };
                break;

            case 5:
                this._color.rgb = {
                    red: v,
                    green: vMin,
                    blue: vDec,
                };
                break;
        }
    }

    private _RGBToHSV(): void {
        let r = this._color.rgb.red;
        let g = this._color.rgb.green;
        let b = this._color.rgb.blue;

        let max: number = Math.max(r, g, b);
        let min: number = Math.min(r, g, b);

        this._color.hsv.brightness = max;
        this._color.hsv.saturation = (max === 0 ? 0: 1 - min/max);

        let mm: number = max - min;

        if (max === min) {
            this._color.hsv.hue = 0;
        } else if (max === r && g >= b) {
            this._color.hsv.hue = 60 * (g - b) / mm;
        } else if (max === r && g < b) {
            this._color.hsv.hue = 60 * (g - b) / mm + 360;
        } else if (max === g) {
            this._color.hsv.hue = 60 * (b - r) / mm + 120;
        } else if (max === b) {
            this._color.hsv.hue = 60 * (r - g) / mm + 240;
        }
    }

    private _colorIsValid(v: IHSV | IRGB, type: string): boolean {
        for (let key in v) {
            if (v[key] > LimitsMax[type][key] || v[key] < LimitsMin[type][key]) {
                return false;
            }
        }

        return true;
    }
}