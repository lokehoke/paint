'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { screenSizeRestrictions as ssr } from '../../../settings/globalSetting.json';
import { Vector2 } from '../../../structDate/vector2';
import { newTabAction } from '../../../actions/tabActions';
import { closeWindowAction } from '../../../actions/openedWindowsActions';
import bind from 'bind-decorator';

enum EType {
    x = 'x',
    y = 'y',
}

const connector = connect(null, (dispatch) => ({
    createNew: (size: Vector2, title: string): void => {
        dispatch(newTabAction(title, size));
    },
    deleteThisTab: (id: number): void => {
        dispatch(closeWindowAction(id));
    },
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType & {
    id: number;
};

class NewFile extends React.Component<PropsType> {
    private x: HTMLInputElement;
    private y: HTMLInputElement;
    private _title: HTMLInputElement;
    private _createBtn: HTMLButtonElement;

    props: PropsType;

    render(): React.ReactNode {
        return (
            <div className='newFile'>
                <div>
                    <span>Title&nbsp;</span>
                    <input
                        ref={(inp: HTMLInputElement): void => {
                            this._title = inp;
                        }}
                        maxLength={10}
                    />
                </div>
                <div>
                    <span>Size&nbsp;</span>
                    <input
                        ref={(inp: HTMLInputElement): void => {
                            this.x = inp;
                        }}
                        type='number'
                        max={ssr['x'].max}
                        min={ssr['x'].min}
                    />
                    &nbsp;x&nbsp;
                    <input
                        ref={(inp: HTMLInputElement): void => {
                            this.y = inp;
                        }}
                        type='number'
                        max={ssr['y'].max}
                        min={ssr['y'].min}
                    />
                </div>
                <div>
                    <button
                        ref={(btn: HTMLButtonElement): void => {
                            this._createBtn = btn;
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        this._createBtn.addEventListener('click', this._clickNewFile);
    }

    @bind
    _clickNewFile(e: MouseEvent): boolean {
        e.preventDefault();

        const size = new Vector2(this._getValue(EType.x), this._getValue(EType.y));
        const title = this._title.value !== '' ? this._title.value : 'untitled';

        this.props.deleteThisTab(this.props.id);
        this.props.createNew(size, title);

        return false;
    }

    @bind
    _getValue(type: EType): number {
        if (+this[type].value > ssr[type].max || +this[type].value <= ssr[type].min || this[type].value === '') {
            return ssr[type].default;
        } else {
            return +this[type].value;
        }
    }
}

export default connector(NewFile);
