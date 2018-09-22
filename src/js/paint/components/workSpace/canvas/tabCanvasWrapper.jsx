'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const FlexiblePlace = require('../../../../../../../react-customScroll-movePlace-zoom/index.jsx');

const Modes = require('./modesDrowing/modes.js');

class Tabs extends React.Component {
    componentWillMount() {
        this._canv = [];
        this._ctx = [];
    }

    render() {
        let tabs = this.props.tabs.map((el, i) => (
            <canvas
                key={i}
                ref={canv => this._canv[i] = canv}
                className={(el.id === this.props.activeTab ? 'active' : '')}
                height={el.size.x}
                width={el.size.y}
            />
        ));

        return (
            <FlexiblePlace height={this.props.size.height} width={this.props.size.width}>
                {tabs}
            </FlexiblePlace>
        );
    }

    componentDidMount() {
        this._setContext();
        this._mode = new Modes();
        this._deleteListeners = () => {};
        if (this.props.tabs[this.props.tabs.length - 1]) {
            this._idLastCanvas = this.props.tabs[this.props.tabs.length - 1].id;
        } else {
            this._idLastCanvas = -1;
        }

        if (this.props.activeTab >= 0) {
            this._changeDrowingMode();
        }
    }

    componentDidUpdate() {
        this._setContext();
        if (
            this.props.tabs[this.props.tabs.length - 1]
        &&
            this.props.tabs[this.props.tabs.length - 1].id !== this._idLastCanvas
        ) {
            this._drowNewCanvas();
            this._idLastCanvas = this.props.tabs[this.props.tabs.length - 1].id;
        } else if (this.props.activeTab >= 0) {
            this._changeDrowingMode();
        }
    }

    _drowNewCanvas() {
        let canvas = this._canv[this._canv.length - 1];
        let ctx = this._ctx[this._ctx.length - 1];

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this._changeDrowingMode();
    }

    _setContext() {
        this._ctx = [];
        this._canv.forEach((el) => {
            this._ctx.push(el.getContext('2d'));
        });
    }

    _changeDrowingMode() {
        this._deleteListeners();
        let active = this.props.activeTab;

        let mode = new (this._mode.getMode(this.props.instrumentary.activeInstrument))(this.props.instrumentary);
        this._deleteListeners = mode.setListeners(this._canv[active], this._ctx[active]);
    }
}

module.exports = ReactRedux.connect(
    state => ({
        size: {
            height: state.sizeScreen.height - 75,
            width: state.sizeScreen.width - 45
        },
        tabs: state.tabs.own,
        activeTab: state.tabs.activeTab,
        instrumentary: state.instruments
    })
)(Tabs);
