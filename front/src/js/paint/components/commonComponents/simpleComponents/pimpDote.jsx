'use strict';

import React from 'react';
import PropTypes from 'prop-types';

let style = {
    display: 'flex',
    height: '20px',
    width: '20px',
    borderRadius: '100%',
    backgroundColor: '#f1e5dd',
    cursor: 'pointer',
};

export default class pimpDote extends React.Component {
    static defaultProps = {
        style: style
    };

    static propTypes = {
        style: PropTypes.object
    };

    render() {
        style = Object.assign({}, style, this.props.style);
        return (
            <div style={style} ref={dote => this._dote = dote} />
        );
    }

    getDom() {
        return this._dote;
    }
}
