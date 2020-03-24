'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { Palette as PaletteBasic } from '../../commonComponents/palette/palette';
import { changeColorAction } from '../../../actions/instrumentsActions';

class Palette extends React.Component {
    constructor(props) {
        super(props);
        this._changeColor = this._changeColor.bind(this);
    }

    render() { // TODO random digits
        return (
            <div>
                <PaletteBasic mainSide={200} changing={this._changeColor} />
            </div>
        );
    }

    _changeColor(val) {
        this.props.changeColor(val.color);
    }
}


export default connect(
    state => ({
        currentColor: +state.instruments.currentColor,
    }), dispatch => ({
        changeColor: val => dispatch(changeColorAction(val)),
    })
)(Palette);