'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

export interface IRootState {
    instruments: {
        currentLineThickness: number;
    };
}

const connector = connect((state: IRootState) => ({
    size: state.instruments.currentLineThickness,
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType;

class SizeLine extends React.Component {
    props: PropsType;

    render() {
        return <div className='footerObject'>{this.props.size}px</div>;
    }
}

export default connector(SizeLine);
