'use strict';

import React from 'react';

import { PimpDote } from '../simpleComponents/pimpDote';

import { DragAndDrop, IExportDate as IExportDateDND } from '../../../libs/dragAndDrop/dragAndDrop';
import bind from 'bind-decorator';
import css from 'csstype';
import { Vector2 } from '../../../structDate/vector2';

const sizePoint = 20;

const stylesValueSlider: css.Properties = {
    position: 'relative',
    display: 'flex',
    margin: '0 15px',
    flexGrow: 1,
    height: '2px',
    backgroundColor: 'black',
};

const stylePip: css.Properties = {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    display: 'none',
    width: `${sizePoint}px`,
    height: `${sizePoint}px`,
};

export interface IExportDate {
    currentStep: number;
}

export interface IProps {
    min: number;
    max: number;
    cur: number;
    step: number;
    changing: (e: IExportDate) => void;
}

export default class ValueSlider extends React.Component {
    static defaultProps: IProps = {
        min: 0,
        max: 0,
        cur: 0,
        step: 1,
        changing: (): void => undefined,
    };

    private _pimp: PimpDote;
    private _deleteDnd = (): void => undefined;

    props: IProps;

    render(): React.ReactNode {
        return (
            <div style={stylesValueSlider}>
                <PimpDote
                    style={stylePip}
                    ref={(pimp: PimpDote): void => {
                        this._pimp = pimp;
                    }}
                />
            </div>
        );
    }

    componentDidMount(): void {
        this._deleteDnd = this._setUpDragAndDrop();
    }

    _setUpDragAndDrop(): () => void {
        const drag = new DragAndDrop(this._pimp.getDom(), {
            ignoreNoDragAndDrop: true,
            onlyX: true,
            showAfterMount: {
                isset: true,
                sizeItem: new Vector2(sizePoint, sizePoint),
            },
            piece: {
                exist: true,
                min: new Vector2(this.props.min, 0),
                max: new Vector2(this.props.max, 0),
                step: new Vector2(this.props.step, 0),
                cur: new Vector2(this.props.cur, 0),
                exitFromContour: true,
            },
            transferDate: this._changeValue,
        });

        return drag.startDragAndDrop();
    }

    @bind
    _changeValue(e: IExportDateDND): void {
        this.props.changing(e);
    }

    componentWillUnmount(): void {
        this._deleteDnd();
    }
}
