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

let wrapperStyle: css.Properties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
};

let infoBlockStyle: css.Properties = {
    display: 'flex',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
};


export interface IExportValue {
    color: Color;
};

export type ChangeValueFunctionType = (val: IExportValue) => void;

export interface IProps {
    changing: ChangeValueFunctionType;
    mainSide: number;
    color   : Color;
}

export class Palette extends React.Component {
    static defaultProps: IProps = {
        changing: () => {},
        mainSide: 200,
        color: new Color(),
    };

    private _svSize: Vector2;
    private _hueSize: Vector2;

    props: IProps;

    constructor(props: IProps) {
        super(props); // TODO style is fucking shit!!!!

        this._svSize  = new Vector2(props.mainSide, props.mainSide);
        this._hueSize = new Vector2(props.mainSide, props.mainSide/10);

        mainStyleBlock = Object.assign(
            {},
            mainStyleBlock,
            {
                height: props.mainSide,
                width: this._svSize.y + this._hueSize.y + props.mainSide/10,
            },
        )
    }

    render() { // TODO it is 2 component hue and other, maybe 3 component
        return (
            <div style={wrapperStyle}>
                <div style={mainStyleBlock}>
                    <Sv
                        saturation={this.props.color.getHSV().saturation}
                        brightness={this.props.color.getHSV().brightness}
                        size={this._svSize}
                        changeValue={this._changeSv}
                    />
                    <Hue
                        hue={this.props.color.getHSV().hue}
                        size={this._hueSize}
                        changeValue={this._changeHue}
                    />
                </div>
                <div style={infoBlockStyle}>
                    <canvas height="33px" width="70px" />
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span>HEX:</span>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }

    @bind
    _changeHue(e: IExportValueHue) {
        let hsv: HSV = this.props.color.getHSV();
        hsv.hue = e.hue;

        this._sendValue(hsv);
    }

    @bind
    _changeSv(e: IExportValueSv) {
        let hsv: HSV = this.props.color.getHSV();
        hsv.saturation = e.saturation;
        hsv.brightness = e.brightness;

        this._sendValue(hsv);
    }

    _sendValue(hsv: HSV) {
        let c = new Color();
        c.setHSV(hsv);
        this.props.changing({
            color: c,
        });
    }
}