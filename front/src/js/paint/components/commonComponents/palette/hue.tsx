'use strict';

import React from 'react';
import css from 'csstype';
import { Vector2 } from '../../../structDate/vector2';
import { PointerArrow } from '../simpleComponents/pointerArrow';
import { DragAndDrop, IExportDate as IDndExportDate } from '../../../libs/dragAndDrop/dragAndDrop';
import bind from 'bind-decorator';

let containerPointerArrowStyle: css.Properties = {
    display: 'flex',
    position: 'absolute',
    top: '0',
    right: '0',
};

export interface IExportValue {
    hue: number;
}

export interface IProps {
    hue: number;
    size: Vector2;
    changeValue: (e: IExportValue) => void;
}

export class Hue extends React.Component {
    static defaultProps: IProps = {
        hue: 0,
        size: new Vector2(),
        changeValue: () => undefined,
    };

    private _hue: HTMLCanvasElement;
    private _hueStx: CanvasRenderingContext2D;
    private _hueStyle: css.Properties;
    props: IProps;

    private _pointerArrow: PointerArrow;
    private _deleteDnd: () => void;

    constructor(props: IProps) {
        super(props);

        this._hueStyle = {
            height: `${props.size.x}px`,
            width: `${props.size.y}px`,
        };

        containerPointerArrowStyle = Object.assign({}, containerPointerArrowStyle, this._hueStyle);
    }

    render(): React.ReactNode {
        return (
            <>
                <canvas
                    height={this._hueStyle.height}
                    width={this._hueStyle.width}
                    ref={(hue: HTMLCanvasElement): void => {
                        this._hue = hue;
                    }}
                />
                <div style={containerPointerArrowStyle}>
                    <PointerArrow
                        style={{
                            height: 10,
                            right: -5,
                        }}
                        ref={(pointerArrow: PointerArrow): void => {
                            this._pointerArrow = pointerArrow;
                        }}
                    />
                </div>
            </>
        );
    }

    componentDidMount(): void {
        this._hueStx = this._hue.getContext('2d');
        this._createHue();
        this._setUpDragAndDrop();
    }

    componentWillUnmount(): void {
        this._deleteDnd();
    }

    private _setUpDragAndDrop(): void {
        const drag: DragAndDrop = new DragAndDrop(this._pointerArrow.getDom(), {
            ignoreNoDragAndDrop: true,
            onlyY: true,
            showAfterMount: {
                isset: true,
                sizeItem: new Vector2(30, 10),
            },
            piece: {
                exist: true,
                exitFromContour: true,
                min: new Vector2(0, 1),
                max: new Vector2(0, 355),
                step: new Vector2(0, 1),
                cur: new Vector2(0, 1),
            },
            transferDate: this._changeValue,
        });

        this._deleteDnd = drag.startDragAndDrop();
    }

    @bind
    private _changeValue(e: IDndExportDate): void {
        // TODO
        this.props.changeValue({
            hue: e.currentStep,
        });
    }

    private _createHue(): void {
        const hue: Array<string> = ['ff0000', 'ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', 'ff0000'];

        const ctx = this._hueStx;
        const grd = ctx.createLinearGradient(0, 0, 0, this.props.size.x);

        for (let i = 0; i < hue.length; i++) {
            const color = `#${hue[i]}`;
            grd.addColorStop(i / 6, color);
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this.props.size.y, this.props.size.x);
    }
}
