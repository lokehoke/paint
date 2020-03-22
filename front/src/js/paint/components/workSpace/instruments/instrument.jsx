'use strict';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

export default class Instrument extends React.Component {
    render() {
        let icon = null;
        let active = '';

        if (this.props.active) {
            active = ' active';
        }

        switch (this.props.type) {
            case 'brush':
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