'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

class SizeLine extends React.Component {
    static defaultProps = {
        size: 16
    };

    static propTypes = {
        size: PropTypes.number
    };

    render() {
        return (
            <div className="footerObject">
                {this.props.size}px
            </div>
        );
    }
}

module.exports = ReactRedux.connect(state => ({
    size: +state.instruments.currentLineThickness
}))(SizeLine);
