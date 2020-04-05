'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { newWindowAction } from '../../../actions/openedWindowsActions';
import { EView } from '../../../structDate/window';
import bind from 'bind-decorator';

const connector = connect(null, (dispatch) => ({
    newFile: (): void => {
        dispatch(newWindowAction(EView.newFile));
    },
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType;

class File extends React.Component {
    private _newFile: HTMLLIElement;

    props: PropsType;

    render(): React.ReactNode {
        return (
            <div className='header__container'>
                <span className='headerContainer__title'>file</span>
                <ul className='headerContainer__subMenu'>
                    <li
                        ref={(nf: HTMLLIElement): void => {
                            this._newFile = nf;
                        }}
                    >
                        <span className='newFile'>New file</span>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount(): void {
        this._newFile.addEventListener('click', this._createNewFile);
    }

    @bind
    private _createNewFile(): void {
        this.props.newFile();
    }
}

export default connector(File);
