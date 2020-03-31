'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Palette as PaletteBasic, IExportValue } from '../../commonComponents/palette/palette';
import { changeColorAction } from '../../../actions/instrumentsActions';
import bind from 'bind-decorator';
import { Color } from '../../../structDate/color';

interface IRootState {
    instruments: {
        currentColor: Color,
    };
};

let connector = connect(
    (state: IRootState) => ({
        currentColor: state.instruments.currentColor,
    }), dispatch => ({
        changeColor: (c: Color) => dispatch(changeColorAction(c)),
    })
);

type PropsReduxType = ConnectedProps<typeof connector>
export type PropsType = PropsReduxType & {
    id: number,
}

class Palette extends React.Component {
    props: PropsType;

    render() { // TODO random digits
        return (
            <PaletteBasic color={this.props.currentColor} changing={this._changeColor} />
        );
    }

    @bind
    private _changeColor(val: IExportValue): void {
        this.props.changeColor(val.color);
    }
}

export default connector(Palette);