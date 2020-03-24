'use strict';

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

    }

    private _RGBToHSV(): void {

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