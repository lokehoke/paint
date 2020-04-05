'use strict';

//TODO fix move out of box!!!

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import NewFile from './dropMain/newFile';
import BasicInstrument from './dropMain/basicInstrument';
import Palette from './dropMain/palette';

import { DragAndDrop } from '../../libs/dragAndDrop/dragAndDrop';
import { closeWindowAction } from '../../actions/openedWindowsActions';
import { EView, WindowClass } from '../../structDate/window';

const connector = connect(null, (dispatch) => ({
    closeWindow: (id: number): void => {
        dispatch(closeWindowAction(id));
    },
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType & {
    id: number;
    element: WindowClass;
};

class DropWindow extends React.Component<PropsType> {
    props: PropsType;

    private _window: HTMLDivElement;
    private _exitBtn: HTMLDivElement;
    private _deleteDragAndDrop: () => void = () => undefined;

    render(): React.ReactNode {
        return (
            <div
                className='dropWindow'
                ref={(window: HTMLDivElement): void => {
                    this._window = window;
                }}
            >
                <header>
                    {this.props.element.title}
                    <div
                        className='__exitIcon'
                        ref={(exit: HTMLDivElement): void => {
                            this._exitBtn = exit;
                        }}
                        data-drag-and-drop='noDragAndDrop'
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </div>
                </header>
                <main data-drag-and-drop='noDragAndDrop'>{this._getMain(this.props.element)}</main>
            </div>
        );
    }

    componentDidMount(): void {
        this._defineSize();
        this._setUpDragAndDrop();

        this._exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.props.closeWindow(this.props.element.id);

            return false;
        });
    }

    componentWillUnmount(): void {
        this._deleteDragAndDrop();
    }

    _setUpDragAndDrop(): void {
        const drag = new DragAndDrop(this._window);
        this._deleteDragAndDrop = drag.startDragAndDrop();
    }

    _defineSize(): void {
        // TODO move digits!!!!!!!!
        let h = 200;
        let w = 200;

        switch (this.props.element.view) {
            case EView.newFile:
                h = 180;
                w = 260;
                break;
            case EView.basicInstrument:
                h = 180;
                w = 260;
                break;
            case EView.palette:
                h = 300;
                w = 280;
                break;
        }

        this._window.style.height = `${h + 2}px`;
        this._window.style.width = `${w + 2}px`;
    }

    _getMain(el: WindowClass): React.ReactNode {
        switch (el.view) {
            case EView.newFile:
                return <NewFile id={this.props.element.id} />;
            case EView.basicInstrument:
                return <BasicInstrument id={this.props.element.id} />;
            case EView.palette:
                return <Palette id={this.props.element.id} />;
        }
    }
}

export default connector(DropWindow);
