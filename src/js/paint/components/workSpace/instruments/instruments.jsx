'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const Instrument = require('./instrument.jsx');

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

module.exports = ReactRedux.connect((state) => {
    return {
        instruments: state.instruments.currentInstruments,
        active: state.instruments.activeInstrument
    };
})(Instruments);
