'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

const DropWindow = require('./dropWindow.jsx');

class DrugonWindowWrapper extends React.Component {
    static defaultProps = {
        openedWindows: []
    };

    static propTypes = {
        openedWindows: PropTypes.array
    };

    render() {
        return this.props.openedWindows.map((el, i) =>
            <DropWindow element={el} key={i}/>
        );
    }
}

module.exports = ReactRedux.connect(
    state => ({
        openedWindows: state.openedWindows.own
    }),
    dispatch => ({})
)(DrugonWindowWrapper);
