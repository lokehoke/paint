'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const Instrument = require('./instrument.js');

class Instrumensts extends React.Component {
    render() {
        return (
            <aside className="instrumentWrapper">
                {this.props.instrumensts.map((ins, i) =>
                    <Instrument type={ins} key={i} />
                )}
            </aside>
        );
    }
}

module.exports = ReactRedux.connect((state) => {
    return {
        instrumensts: state.currentInstruments
    };
})(Instrumensts);
