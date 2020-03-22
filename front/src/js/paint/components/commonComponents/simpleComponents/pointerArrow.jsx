'use strict';

import React from 'react';
import PropTypes from 'prop-types';

let bundleStyle = {
    height: 10,
    width: 30,
    colorArrow: 'white',
    colorRectangle: 'black',
};

let style = {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    position: 'absolute',
};


export default class pimpDote extends React.Component {
    static propTypes = {
        style: PropTypes.object,
    };

    render() {
        let conf = Object.assign({},bundleStyle, this.props.style);
        let array = {
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderWidth: conf.height/2,
        };

        let rightArrow = Object.assign({}, array, {
            borderRightColor: conf.colorArrow,
            position: 'absolute',
            right: 0,
            zIndex: 10,
        });
        
        let leftArrow = Object.assign({}, array, {
            borderLeftColor: conf.colorArrow,
            left: 0,
            position: 'absolute',
            zIndex: 10,
        });
        
        style.width = conf.width;
        style.height = conf.height;
        style.right = 5;

        let rectangle = {
            width: conf.width,
            height: conf.height / 5,
            background: conf.colorRectangle,
            position: 'absolute',
        }
        return (
            <div style={style} ref={pointer => this._pointer = pointer} >
                <div style={leftArrow} />
                <div style={rectangle} />
                <div style={rightArrow} />
            </div>
        );
    }

    getDom() {
        return this._pointer;
    }
}
