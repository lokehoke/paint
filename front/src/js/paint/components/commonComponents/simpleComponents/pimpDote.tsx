'use strict';

import React, { createRef } from 'react';
import css from 'csstype';

let style: css.Properties = {
    display: 'flex',
    height: '20px',
    width: '20px',
    borderRadius: '100%',
    backgroundColor: '#f1e5dd',
    cursor: 'pointer',
};

export interface IProps {
    style: css.Properties;
}

export class PimpDote extends React.Component<IProps, {}> {
    private _dote: HTMLDivElement;

    static defaultProps = {
        style: style
    };

    render() {
        style = Object.assign({}, style, this.props.style);
        return (
            <div style={style} ref={(d: HTMLDivElement) => this._dote = d} />
        );
    }

    getDom() {
        return this._dote;
    }
}