'use strict';

import React, { createRef } from 'react';
import css from 'csstype';

const style: css.Properties = {
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
    private _style: css.Properties;

    static defaultProps: IProps = {
        style,
    };

    constructor(props: IProps) {
        super(props);
        this._style = Object.assign({}, style, this.props.style);
    }

    render() {
        return <div style={this._style} ref={(d: HTMLDivElement) => (this._dote = d)} />;
    }

    getDom(): HTMLDivElement {
        return this._dote;
    }
}
