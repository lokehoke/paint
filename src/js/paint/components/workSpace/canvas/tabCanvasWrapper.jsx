'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const FlexiblePlace = require('../../../../../../../react-customScroll-movePlace-zoom/index.jsx');

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

        if(this.props.currentTab) {
            this._setSize();
            this._drowCanvas();
        }
    }

    componentDidUpdate() {
        if(this.props.currentTab) {
            this._setSize();
            this._drowCanvas();
        } else {
            this._clearCanvas();
        }
    }

    _setSize() {
        this._canv.height = this.props.currentTab.size.x;
        this._canv.width = this.props.currentTab.size.y;
    }

    _drowCanvas() {
        let canvas = this._canv;
        let ctx = this._ctx;
        let gradient = ctx.createLinearGradient(0, 0, 1000, 0);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'white');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    _clearCanvas() {
        let canvas = this._canv;
        let ctx = this._ctx;
        this._ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    _setContext() {
        this._ctx = this._canv.getContext('2d');
    }

}

module.exports = ReactRedux.connect(
    state => ({
        size: {
            height: state.sizeScreen.height - 75,
            width: state.sizeScreen.width - 45
        },
        currentTab: state.tabs.own.find(el => el.id === state.tabs.activeTab)
    })
)(Tabs);
