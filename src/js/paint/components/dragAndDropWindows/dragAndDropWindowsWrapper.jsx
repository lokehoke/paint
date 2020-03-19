'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

const DropWindow = require('./dropWindow.jsx');

class DragAndDropWindowWrapper extends React.Component {
    static defaultProps = {
        openedWindows: []
    };

    static propTypes = {
        openedWindows: PropTypes.array
    };

    render() {
        return this.props.openedWindows.map((el, i) =>
            <DropWindow element={el} key={el.id} />
        );
    }
}

module.exports = ReactRedux.connect(
    state => ({
        openedWindows: state.openedWindows.own
    }),
    dispatch => ({})
)(DragAndDropWindowWrapper);
