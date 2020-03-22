'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

export default connect(state => ({
    size: +state.instruments.currentLineThickness
}))(SizeLine);
