'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const ValueSlider = require('./../../commonComponents/valueSlider/valueSlider.jsx');

class BasicInstrument extends React.Component {
    constructor(props) {
        super(props);
        this._changeLineThickness = this._changeLineThickness.bind(this);
    }

    render() {
        return (
            <div className="basicInstrument">
                <div className="basicInstrument__inner">
                    <span>Font size: </span>
                    <ValueSlider
                        min={2}
                        max={100}
                        cur={this.props.curFontSize}
                        changing={this._changeLineThickness}
                        changingValue={2}
                    />
                </div>
            </div>
        );
    }

    _changeLineThickness(e) {
        this.props.changeLineThickness(e.currentStep);
    }
}


module.exports = ReactRedux.connect(
    state => ({
        curFontSize: +state.instruments.currentLineThickness
    }), dispatch => ({
        changeLineThickness: (val) => {
            dispatch({
                type: 'CHANGE_LINE_THICKNESS',
                currentLineThickness: val
            });
        }
    })
)(BasicInstrument);
