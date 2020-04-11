'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Color } from '../../../structDate/color';

export interface IRootState {
    instruments: {
        currentColor: Color;
    };
}

const connector = connect((state: IRootState) => ({
    color: state.instruments.currentColor.getRGBHexString(),
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType;

class ColorComponent extends React.Component {
    props: PropsType;

    render(): React.ReactNode {
        return <div className='footerObject'>{this.props.color}</div>;
    }
}

export default connector(ColorComponent);
