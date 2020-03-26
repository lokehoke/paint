'use strict';

import React from 'react';
import css from 'csstype';

import { DragAndDrop, ITransferDate } from '../../../libs/dragAndDrop/dragAndDrop';

import { PointerArrow } from '../simpleComponents/pointerArrow';
import { Vector2 } from '../../../structDate/vector2';
import bind from 'bind-decorator';

let mainStyleBlock: css.Properties = {
    display: 'flex',
    position: 'relative',
};

let containerPointerArrowStyle: css.Properties = {
    display: 'flex',
    position: 'absolute',
    top: '0',
    right: '0',
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
    color: string
};

export type ChangeValueFunctionType = (val: IExportValue) => void;

export interface IProps {
    changing: ChangeValueFunctionType;
    mainSide: number;
    color   : string;
}

export class Palette extends React.Component {
    static defaultProps = {
        changing: () => {},
        mainSide: 100,
    };

    private _sv : HTMLCanvasElement;
    private _hue: HTMLCanvasElement;

    private _svStx : CanvasRenderingContext2D;
    private _hueStx: CanvasRenderingContext2D;

    private _svStyle : css.Properties;
    private _hueStyle: css.Properties;

    private _svSize: Vector2;
    private _hueSize: Vector2;

    props: IProps;

    private _pointerArrow: PointerArrow;

    private _deleteDnd: () => void;

    constructor(props: IProps) {
        super(props); // TODO style is fucking shit!!!!

        this._svStx  = null;
        this._hueStx = null;

        this._svSize  = new Vector2(props.mainSide, props.mainSide);
        this._hueSize = new Vector2(props.mainSide, props.mainSide/10);

        this._svStyle = {
            height:      `${this._svSize.x}px`,
            width:       `${this._svSize.y}px`,
            marginRight: `${props.mainSide/10}px`,
        };
        this._hueStyle = {
            height: `${this._hueSize.x}px`,
            width:  `${this._hueSize.y}px`,
        };

        containerPointerArrowStyle = Object.assign(
            containerPointerArrowStyle,
            this._hueStyle,
        );

        mainStyleBlock = Object.assign(
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
                    <canvas
                        height={this._svStyle.height}
                        width={this._svStyle.width}
                        style={this._svStyle}
                        ref={sv => this._sv = sv}
                    />
                    <canvas
                        height={this._hueStyle.height}
                        width={this._hueStyle.width}
                        ref={hue => this._hue = hue}
                    />
                    <div style={containerPointerArrowStyle}>
                        <PointerArrow
                            style={{
                                height: 10,
                                right:  -5,
                            }}
                            ref={pointerArrow => this._pointerArrow = pointerArrow}
                        />
                    </div>
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

    componentDidMount(): void {
        this._svStx  = this._sv.getContext('2d');
        this._hueStx = this._hue.getContext('2d');
        this._createHue();
        this._createSv();

        this._deleteDnd = this._setUpDragAndDrop();
    }

    componentWillUnmount(): void {
        this._deleteDnd();
    }

    private _setUpDragAndDrop(): () => void { // it is hue dnd, need init
        let drag: DragAndDrop = new DragAndDrop(this._pointerArrow.getDom(), {
            ignoreNoDragAndDrop: true,
            onlyY: true,
            showAfterMount: {
                isset: true,
                sizeItem: new Vector2(30, 10),
            },
            piece: {
                exist: true,
                exitFromContour: true,
                min:  new Vector2(0, 1),
                max:  new Vector2(0, 360),
                step: new Vector2(0, 1),
                cur:  new Vector2(0, 1),
            },
            transferDate: this._changeValue,
        });

        return drag.startDragAndDrop();
    }

    @bind
    private _changeValue(e: ITransferDate): void { // TODO
        console.log(e);
    }

    private _createHue(): void {
        let hue: Array<string> = [
            'ff0000',
            'ffff00',
            '00ff00',
            '00ffff',
            '0000ff',
            'ff00ff',
            'ff0000',
        ];

        let ctx = this._hueStx;
        let grd = ctx.createLinearGradient(0, 0, 0, this._hueSize.x);

        for (let i = 0; i < hue.length; i++) {
            let color = `#${hue[i]}`;
            grd.addColorStop(i / 6, color);
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this._hueSize.y, this._hueSize.x);
    }

    private _createSv(): void { // TODO
        let ctx = this._svStx;


    }
}