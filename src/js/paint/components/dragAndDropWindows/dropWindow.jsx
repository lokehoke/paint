'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import NewFile from './dropMain/newFile.jsx';
import BasicInstrument from './dropMain/basicInstrument.jsx';
import Palette from './dropMain/palette.jsx';

import DragAndDrop from './../../commonInterface/dragAndDrop/dragAndDrop.js';

class DropWindow extends React.Component {
    render() {
        return (
            <div className="dropWindow" ref={window => this._window = window}>
                <header>
                    {this.props.element.title}
                    <div
                        className="__exitIcon"
                        ref={exit => this.exitBtn = exit}
                        data-drag-and-drop="noDragAndDrop"
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </div>
                </header>
                <main data-drag-and-drop="noDragAndDrop">
                    {this._getMain(this.props.element)}
                </main>
            </div>
        );
    }

    componentDidMount() {
        this._defineSize();
        this._deleteDragAndDrop = this._setUpDragAndDrop() || (() => {});

        this.exitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.props.closeWindow(this.props.element.id);
            
            return false;
        });
    }

    componentWillUnmount() {
        this._deleteDragAndDrop();
    }

    _setUpDragAndDrop() {
        let drag = new DragAndDrop(this._window);
        return drag.startDragAndDrop();
    }

    _defineSize() { // TODO move digits!!!!!!!!
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

        return main;
    }
}

export default connect(
    null,
    dispatch => ({
        closeWindow: id => {
            dispatch({
                type: 'CLOSE_WINDOW',
                id,
            })
        },
    })
)(DropWindow);