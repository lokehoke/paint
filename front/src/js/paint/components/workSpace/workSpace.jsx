'use strict';

import React from 'react';

import MainCanvas from './canvas/canvas.jsx';
import Instruments from './instruments/instruments.jsx';
import WindowWrapper from './windows/windowWrapper.jsx';

export default class WorkSpace extends React.Component {
    render() {
        return (
            <div className="workSpace">
                <Instruments />
                <MainCanvas />
                <WindowWrapper />
            </div>
        );
    }
}