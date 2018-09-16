'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const FlexiblePlace = require('../../../../../../../react-customScroll-movePlace-zoom/index.jsx');

const Modes = require('./modesDrowing/modes.js');

class Tabs extends React.Component {
    render() {
        return (
            <FlexiblePlace height={this.props.size.height} width={this.props.size.width}>
                <canvas ref={canvas => this._canv = canvas} />
            </FlexiblePlace>
        );
    }

    componentDidMount() {
        this._setContext();
        this._mode = new Modes();
        this._currentTab = null;
        this._deleteListeners = () => {};

        this._canv.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        })
    }

    componentDidUpdate() {
        if (this.props.currentTab && this._currentTab && this._currentTab.id === this.props.currentTab.id) {
            this._changeDrowingMode();
        } else if(this.props.currentTab) {
            this._currentTab = this.props.currentTab;
            this._setSize();
            this._drowCanvas();
        } else {
            this._clearCanvas();
            this._currentTab = null;
        }
    }

    _setSize() {
        this._canv.height = this.props.currentTab.size.x;
        this._canv.width = this.props.currentTab.size.y;
    }

    _drowCanvas() {
        let canvas = this._canv;
        let ctx = this._ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this._changeDrowingMode();
    }

    _clearCanvas() {
        let canvas = this._canv;
        let ctx = this._ctx;
        this._ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    _setContext() {
        this._ctx = this._canv.getContext('2d');
    }

    _changeDrowingMode() {
        this._drowingModesFuncSetter(this._canv);
    }

    _drowingModesFuncSetter() {
        this._deleteListeners();

        let mode = new (this._mode.getMode(this.props.instrumentary.activeInstrument))(this.props.instrumentary);
        this._deleteListeners = mode.setListeners(this._canv, this._ctx);
    }

}

module.exports = ReactRedux.connect(
    state => ({
        size: {
            height: state.sizeScreen.height - 75,
            width: state.sizeScreen.width - 45
        },
        currentTab: state.tabs.own.find(el => el.id === state.tabs.activeTab),
        instrumentary: state.instruments
    })
)(Tabs);
