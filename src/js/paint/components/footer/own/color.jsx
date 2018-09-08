'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

class Color extends React.Component {
    static defaultProps = {
        color: '#000'
    };

    static propTypes = {
        color: PropTypes.string
    };

    render() {
        return (
            <div className="footerObject">
                {this.props.color}
            </div>
        );
    }
}

module.exports = ReactRedux.connect(state => ({
    color: state.currentColor
}))(Color);
