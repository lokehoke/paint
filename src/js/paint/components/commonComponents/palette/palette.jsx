'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import DragAndDrop from './../../../commonInterface/dragAndDrop/dragAndDrop.js';

import PointerArrow from './../simpleComponents/pointerArrow.jsx';

let mainStyleBlock = {
    display: 'flex',
    position: 'relative',
};

let containerPointerArrowStyle = {
    display: 'flex',
    position: 'absolute',
    top: '0',
    right: '0',
};

export default class Palette extends React.Component {
    static defaultProps = {
        changing: () => {},
        side: 100,
    }

    static propTypes = {
        changing: PropTypes.func,
        mainSide: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this._svStx = null;
        this._hueStx = null;
        this._svStyle = {
            width: this.props.mainSide,
            height: this.props.mainSide,
            marginRight: this.props.mainSide / 10,
        };
        this._hueStyle = {
            width: this.props.mainSide / 10,
            height: this.props.mainSide,
        };

        containerPointerArrowStyle = Object.assign(
            {},
            containerPointerArrowStyle,
            this._hueStyle,
        );
    }

    render() {
        return (
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
                            right: -5,
                        }}
                        ref={pointerArrow => this._pointerArrow = pointerArrow}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._svStx = this._sv.getContext('2d');
        this._hueStx = this._hue.getContext('2d');
        this._createHue();

        this._deleteDnd = this._setUpDragAndDrop();
    }

    componentWillUnmount() {
        this._deleteDnd();
    }

    _setUpDragAndDrop() {
        let drag = new DragAndDrop(this._pointerArrow.getDom(), {
            ignoreNoDragAndDrop: true,
            onlyY: true,
            showAfterMount: {
                isset: true,
                sizeItem: {
                    x: 30,
                    y: 10,
                }
            },
            piece: {
                exist: true,
                exitFromContour: true,
                min: {
                    y: 0,
                },
                max: {
                    y: 360,
                },
                step: {
                    y: 1,
                },
                cur: {
                    y: 0,
                }
            },
            transferDate: this._changeValue.bind(this),
        });

        return drag.startDragAndDrop();
    }

    _changeValue() {}

    _createHue() {
        let hue = [
            ['ff0000'],
            ['ffff00'],
            ['00ff00'],
            ['00ffff'],
            ['0000ff'],
            ['ff00ff'],
            ['ff0000'],
        ];

        let ctx = this._hueStx;
        let grd = ctx.createLinearGradient(0, 0, 0, this._hueStyle.height);
        for (let i = 0; i < hue.length; i++) {
            let color = `#${hue[i]}`;
            grd.addColorStop(i / 6, color);
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this._hueStyle.width, this._hueStyle.height);
    }
}
