'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const PaletteBasic = require('../../commonComponents/palette/palette.jsx');

class Palette extends React.Component {
    constructor(props) {
        super(props);
        this._changeColor = this._changeColor.bind(this);
    }

    render() {
        return (
            <div>
                <PaletteBasic
                    mainSide={200}
                    changing={this._changeColor}
                />
            </div>
        );
    }

    _changeColor(val) {
        this.props.changeColor(val.color);
    }
}


module.exports = ReactRedux.connect(
    state => ({
        currentColor: +state.instruments.currentColor
    }), dispatch => ({
        changeColor: (val) => {
            dispatch({
                type: 'CHANGE_COLOR',
                color: val
            });
        }
    })
)(Palette);
