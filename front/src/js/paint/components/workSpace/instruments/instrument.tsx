'use strict';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { EInstrumentMode } from '../../../ctx/drawingModes/modes';

export interface IProps {
    active: boolean,
    type: EInstrumentMode,
}

export default class Instrument extends React.Component {
    props: IProps;

    render() {
        let icon = null;
        let active = '';

        if (this.props.active) {
            active = ' active';
        }

        switch (this.props.type) {
            case EInstrumentMode.brush:
                icon = (<FontAwesomeIcon icon={faPaintBrush} color="white" />);
                break;
        }

        return (
            <div className={'instrument' + active}>
                {icon}
            </div>
        );
    }
}