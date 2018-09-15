'use strict';

const React = require('react');

const TabCanvas = require('./tabCanvasWrapper.jsx');
const ListTabs = require('./tabs/listTabs.jsx');

class Canvas extends React.Component {
    render() {
        return (
            <div className="canvasWrapper">
                <ListTabs />
                <TabCanvas />
            </div>
        );
    }
}

module.exports = Canvas;
