'use strict';

import React from 'react';
import { connect } from 'react-redux';

import Instrument from './instrument.jsx';

class Instruments extends React.Component {
    render() {
        let instruments = [];
        let active = false;

        for (let key in this.props.instruments) {
            if (this.props.instruments[key]) {
                active = (key === this.props.active ? true : false);
                instruments.push(<Instrument type={key} key={key} active={active} />);
            }
        }

        return (
            <aside className="instrumentWrapper">
                {instruments}
            </aside>
        );
    }
}

export default connect((state) => {
    return {
        instruments: state.instruments.currentInstruments,
        active: state.instruments.activeInstrument
    };
})(Instruments);
