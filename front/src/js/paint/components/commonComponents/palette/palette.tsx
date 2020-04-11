'use strict';

import React from 'react';
import css from 'csstype';

import { Vector2 } from '../../../structDate/vector2';
import { Hue, IExportValue as IExportValueHue } from './hue';
import { Sv, IExportValue as IExportValueSv } from './sv';
import { Color, HSV } from '../../../structDate/color';
import bind from 'bind-decorator';

let mainStyleBlock: css.Properties = {
    display: 'flex',
    position: 'relative',
};

const wrapperStyle: css.Properties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
};

const infoBlockStyle: css.Properties = {
    display: 'flex',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
};

export interface IExportValue {
    color: Color;
}

export type ChangeValueFunctionType = (val: IExportValue) => void;

export interface IProps {
    changing: ChangeValueFunctionType;
    mainSide: number;
    color: Color;
}

export class Palette extends React.Component {
    static defaultProps: IProps = {
        changing: () => undefined,
        mainSide: 200,
        color: new Color(),
    };

    private _svSize: Vector2;
    private _hueSize: Vector2;

    props: IProps;

    constructor(props: IProps) {
        super(props);

        this._svSize = new Vector2(props.mainSide, props.mainSide);
        this._hueSize = new Vector2(props.mainSide, props.mainSide / 10);

        mainStyleBlock = {
            ...mainStyleBlock,
            height: `${props.mainSide}px`,
            width: `${this._svSize.y + this._hueSize.y + props.mainSide / 10}px`,
        };
    }

    render(): React.ReactNode {
        // TODO it is 2 component hue and other, maybe 3 component
        const hsv: HSV = this.props.color.getHSV();
        return (
            <div style={wrapperStyle}>
                <div style={mainStyleBlock}>
                    <Sv
                        saturation={hsv.saturation}
                        brightness={hsv.brightness}
                        size={this._svSize}
                        changeValue={this._changeSv}
                    />
                    <Hue hue={hsv.hue} size={this._hueSize} changeValue={this._changeHue} />
                </div>
                <div style={infoBlockStyle}>
                    <canvas height='33px' width='70px' />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>HEX:</span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }

    @bind
    private _changeHue(e: IExportValueHue): void {
        const hsv: HSV = this.props.color.getHSV();
        hsv.hue = e.hue;

        this._sendValue(hsv);
    }

    @bind
    private _changeSv(e: IExportValueSv): void {
        const hsv: HSV = this.props.color.getHSV();
        hsv.saturation = e.saturation;
        hsv.brightness = e.brightness;

        this._sendValue(hsv);
    }

    private _sendValue(hsv: HSV): void {
        const c = new Color();
        c.setHSV(hsv);
        this.props.changing({
            color: c,
        });
    }
}
