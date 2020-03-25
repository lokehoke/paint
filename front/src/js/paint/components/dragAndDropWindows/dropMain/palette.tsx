'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Palette as PaletteBasic, IExportValue } from '../../commonComponents/palette/palette';
import { changeColorAction } from '../../../actions/instrumentsActions';
import bind from 'bind-decorator';

export interface IRootState {
    instruments: {
        currentColor: string,
    };
};

let connector = connect(
    (state: IRootState) => ({
        currentColor: +state.instruments.currentColor,
    }), dispatch => ({
        changeColor: (c: string) => dispatch(changeColorAction(c)),
    })
);

type PropsReduxType = ConnectedProps<typeof connector>
type PropsType = PropsReduxType & {
    id: number,
}

class Palette extends React.Component {
    props: PropsType;

    render() { // TODO random digits
        return (
            <PaletteBasic mainSide={200} changing={this._changeColor} />
        );
    }

    @bind
    private _changeColor(val: IExportValue): void {
        this.props.changeColor(val.color);
    }
}

export default connector(Palette);