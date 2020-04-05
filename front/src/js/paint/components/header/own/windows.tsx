'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { EView } from '../../../structDate/window';
import { newWindowAction } from '../../../actions/openedWindowsActions';
import bind from 'bind-decorator';

const connector = connect(null, (dispatch) => ({
    newWindow: (view: EView): void => {
        dispatch(newWindowAction(view));
    },
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType;

class Windows extends React.Component {
    private _basicInstrument: HTMLLIElement;
    private _palette: HTMLLIElement;

    props: PropsType;

    render(): React.ReactNode {
        return (
            <div className='header__container'>
                <span className='headerContainer__title'>windows</span>
                <ul className='headerContainer__subMenu'>
                    <li
                        ref={(bi: HTMLLIElement): void => {
                            this._basicInstrument = bi;
                        }}
                    >
                        <span>Basic instrument</span>
                    </li>
                    <li
                        ref={(p: HTMLLIElement): void => {
                            this._palette = p;
                        }}
                    >
                        <span>Palette</span>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount(): void {
        this._basicInstrument.addEventListener('click', this._createNewBasicInstrumentWindow);
        this._palette.addEventListener('click', this._createNewPalette);
    }

    @bind
    private _createNewBasicInstrumentWindow(): void {
        this.props.newWindow(EView.basicInstrument);
    }

    @bind
    private _createNewPalette(): void {
        this.props.newWindow(EView.palette);
    }
}

export default connector(Windows);
