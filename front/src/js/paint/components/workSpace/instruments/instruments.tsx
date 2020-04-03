'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Instrument from './instrument';
import { IModeContext } from '../../../reducers/ownReducers/instruments';

interface IRootState {
    instruments: IModeContext,
};

let connector = connect(
    (state: IRootState) => ( {
        instruments: state.instruments.currentInstruments,
        active: state.instruments.activeInstrument
    })
);

type PropsReduxType = ConnectedProps<typeof connector>
export type PropsType = PropsReduxType;

class Instruments extends React.Component {
    props: PropsType;

    render() {
        let instruments = [];
        let active: boolean = false;

        for (let key in this.props.instruments) {
            active = (this.props.instruments[key] === this.props.active);
            instruments.push(<Instrument type={this.props.instruments[key]} key={key} active={active} />);
        }

        return (
            <aside className="instrumentWrapper">
                {instruments}
            </aside>
        );
    }
}

export default connector(Instruments);