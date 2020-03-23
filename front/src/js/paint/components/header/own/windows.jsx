'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { View } from '../../../structDate/window';
import { newWindowAction } from '../../../actions/openedWindowsActions';

class Windows extends React.Component {
    _createNewPalette = this._createNewPalette.bind(this);
    _createNewBasicInstrumentWindow = this._createNewBasicInstrumentWindow.bind(this);
   
    render() {
        return (
            <div className="header__container">
                <span className="headerContainer__title">windows</span>
                <ul className="headerContainer__subMenu">
                    <li>
                        <span ref={bi => this._basicInstrument = bi} >
                            Basic instrument
                        </span>
                    </li>
                    <li>
                        <span ref={p => this._palette = p} >
                            Palette
                        </span>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this._basicInstrument.addEventListener('click', this._createNewBasicInstrumentWindow);
        this._palette.addEventListener('click', this._createNewPalette);
    }

    _createNewBasicInstrumentWindow() {
        this.props.newWindow(View.basicInstrument);
    }

    _createNewPalette() {
        this.props.newWindow(View.palette);
    }
}

export default connect(
    null,
    dispatch => ({
        newWindow: view => dispatch(newWindowAction(view)),
    })
)(Windows);