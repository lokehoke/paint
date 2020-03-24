'use strict';

import React from 'react';
import css from 'csstype';

export interface IProps {
    style: Object,
}

let bundleStyle = {
    height: 10,
    width: 30,
    colorArrow: 'white',
    colorRectangle: 'black',
};

let style: css.Properties = {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    position: 'absolute',
};


export class PointerArrow extends React.Component<IProps, {}> {
    static defaultProps: IProps = {
        style,
    };

    private _conf      : any;
    private _arrow     : css.Properties;
    private _rightArrow: css.Properties;
    private _leftArrow : css.Properties;
    private _style     : css.Properties = style;
    private _rectangle : css.Properties;

    private _pointer   : HTMLDivElement;

    constructor(props: IProps) {
        super(props);

        this._conf = Object.assign({}, bundleStyle, this.props.style);
        this._arrow = {
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderWidth: `${this._conf.height/2}px`,
        };

        this._rightArrow = Object.assign({}, this._arrow, {
            borderRightColor: this._conf.colorArrow,
            position: 'absolute',
            right: 0,
            zIndex: 10,
        });

        this._leftArrow = Object.assign({}, this._arrow, {
            borderLeftColor: this._conf.colorArrow,
            left: 0,
            position: 'absolute',
            zIndex: 10,
        });

        this._style.width = this._conf.width;
        this._style.height = this._conf.height;
        this._style.right = this._conf.right;

        this._rectangle = {
            width: this._conf.width,
            height: `${this._conf.height / 5}px`,
            background: this._conf.colorRectangle,
            position: 'absolute',
        }
    }

    render() {
        return (
            <div style={this._style} ref={(pointer: HTMLDivElement) => this._pointer = pointer} >
                <div style={this._leftArrow} />
                <div style={this._rectangle} />
                <div style={this._rightArrow} />
            </div>
        );
    }

    getDom(): HTMLDivElement {
        return this._pointer;
    }
}
