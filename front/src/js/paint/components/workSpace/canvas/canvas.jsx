'use strict';

import React from 'react';

import TabCanvas from './tabCanvasWrapper.jsx';
import ListTabs from './tabs/listTabs.jsx';

export default class Canvas extends React.Component {
    render() {
        return (
            <div className="canvasWrapper">
                <ListTabs />
                <TabCanvas />
            </div>
        );
    }
}