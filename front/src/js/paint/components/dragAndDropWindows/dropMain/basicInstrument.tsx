'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import ValueSlider from '../../commonComponents/valueSlider/valueSlider';
import { changeLineThicknessAction } from '../../../actions/instrumentsActions';
import bind from 'bind-decorator';
import { IExportDate } from '../../commonComponents/valueSlider/valueSlider';

interface IRootState {
    instruments: {
        currentLineThickness: number;
    };
}

const connector = connect(
    (state: IRootState) => ({
        curFontSize: +state.instruments.currentLineThickness,
    }),
    (dispatch) => ({
        changeLineThickness: (val: number): void => {
            dispatch(changeLineThicknessAction(val));
        },
    }),
);

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType & {
    curFontSize: number;
    id: number;
};

class BasicInstrument extends React.Component<PropsType> {
    props: PropsType;

    render(): React.ReactNode {
        return (
            <div className='basicInstrument'>
                <div className='basicInstrument__inner'>
                    <span>Font size: </span>
                    <ValueSlider
                        min={2}
                        max={40}
                        cur={this.props.curFontSize}
                        changing={this._changeLineThickness}
                        step={2}
                    />
                </div>
            </div>
        );
    }

    @bind
    _changeLineThickness(e: IExportDate): void {
        this.props.changeLineThickness(e.currentStep);
    }
}

export default connector(BasicInstrument);
