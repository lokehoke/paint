'use strict';

import React from 'react';
import { connect } from 'react-redux';

class Windows extends React.Component {
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
        this._basicInstrument.addEventListener('click', this._createNewBasicInstrumentWindow.bind(this));
        this._palette.addEventListener('click', this._createNewPalette.bind(this));
    }

    _createNewBasicInstrumentWindow() {
        this.props.newWindow('basicInstrument');
    }

    _createNewPalette() {
        this.props.newWindow('palette');
    }
}

export default connect(
    null,
    dispatch => ({
        newWindow: view => {
            dispatch({
                type: 'OPEN_WINDOW',
                view,
            })
        },
    })
)(Windows);