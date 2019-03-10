'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome').FontAwesomeIcon;
const faTimesCircle = require('@fortawesome/free-solid-svg-icons').faTimesCircle;

const NewFile = require('./dropMain/newFile.jsx');
const BasicInstrument = require('./dropMain/basicInstrument.jsx');
const Palette = require('./dropMain/palette.jsx');

const DragnDrop = require('./../../commonInterface/dragonDrop/dragnDrop.js');

class DropWindow extends React.Component {
    render() {
        return (
            <div className="dropWindow" ref={window => this._window = window}>
                <header>
                    {this.props.element.title}
                    <div
                        className="__exitIcon"
                        ref={exit => this.exitBtn = exit}
                        data-drugon="noDrugon"
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </div>
                </header>
                <main data-drugon="noDrugon">
                    {this._getMain(this.props.element)}
                </main>
            </div>
        );
    }

    componentDidMount() {
        this._defineSize();
        this._deleteDrugonDrop = (this._setUpDragnDrop() || (() => {}));

        this.exitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.props.closeWindow(this.props.element.id);
            return false;
        });
    }

    componentWiilUnmount() {
        this._deleteDrugonDrop();
    }

    _setUpDragnDrop() {
        let dragn = new DragnDrop(this._window);
        return  dragn.startDragonDroping();
    }

    _defineSize() {
        this._h = 200;
        this._w = 200;

        switch (this.props.element.view) {
            case 'newFile':
                this._h = 180;
                this._w = 260;
                break;
            case 'basicInstrument':
                this._h = 180;
                this._w = 260;
                break;
            case 'palette':
                this._h = 280;
                this._w = 280;
        }

        this._window.style.height = `${this._h+2}px`;
        this._window.style.width = `${this._w+2}px`;
    }

    _getMain(el) {
        let main = null;

        switch (el.view) {
            case 'newFile':
                main = (<NewFile id={this.props.element.id} />);
                break;
            case 'basicInstrument':
                main = (<BasicInstrument id={this.props.element.id} />);
                break;
            case 'palette':
                main = (<Palette id={this.props.element.id} />);
                break;
        }

        return main;;
    }

    _getNewFileMain() {
        return ;
    }
}


module.exports = ReactRedux.connect(
    () => ({}),
    dispatch => ({
        closeWindow: id => {
            dispatch({
                type: 'CLOSE_WINDOW',
                id
            })
        }
    })
)(DropWindow);
