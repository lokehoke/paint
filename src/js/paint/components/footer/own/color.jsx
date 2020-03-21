'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Color extends React.Component {
    static defaultProps = {
        color: '#000',
    };

    static propTypes = {
        color: PropTypes.string,
    };

    render() {
        return (
            <div className="footerObject">
                {this.props.color}
            </div>
        );
    }
}

export default connect(state => ({
    color: state.instruments.currentColor,
}))(Color);
