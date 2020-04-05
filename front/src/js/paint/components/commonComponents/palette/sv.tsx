'use strict';

import React from 'react';
import css from 'csstype';
import { Vector2 } from '../../../structDate/vector2';

// const containerPointerArrowStyle: css.Properties = {
//     display: 'flex',
//     position: 'absolute',
//     top: '0',
//     right: '0',
// };

export interface IExportValue {
    saturation: number;
    brightness: number;
}

export interface IProps {
    saturation: number;
    brightness: number;
    size: Vector2;
    changeValue: (e: IExportValue) => void;
}

export class Sv extends React.Component {
    static defaultProps: IProps = {
        saturation: 0,
        brightness: 0,
        size: new Vector2(),
        changeValue: () => undefined,
    };

    private _sv: HTMLCanvasElement;
    private _svStx: CanvasRenderingContext2D;
    private _svStyle: css.Properties;

    props: IProps;

    private _deleteDnd: () => void = () => undefined;

    constructor(props: IProps) {
        super(props);

        this._svStyle = {
            height: `${props.size.x}px`,
            width: `${props.size.y}px`,
            marginRight: `${props.size.x / 10}px`,
        };
    }

    render(): React.ReactNode {
        return (
            <>
                <canvas
                    height={this._svStyle.height}
                    width={this._svStyle.width}
                    style={this._svStyle}
                    ref={(sv: HTMLCanvasElement): void => {
                        this._sv = sv;
                    }}
                />
            </>
        );
    }

    componentDidMount(): void {
        this._svStx = this._sv.getContext('2d');
        // this._createSv();
        // this._setUpDragAndDrop();
    }

    componentWillUnmount(): void {
        this._deleteDnd();
    }

    // _setUpDragAndDrop(): void {}

    // _createSv(): void {}
}
