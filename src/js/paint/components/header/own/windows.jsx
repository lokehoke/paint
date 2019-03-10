'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

class Winsows extends React.Component {
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

module.exports = ReactRedux.connect(
    state => ({}),
    dispatch => ({
        newWindow: view => {
            dispatch({
                type: 'OPEN_WINDOW',
                view
            })
        }
    })
)(Winsows);
