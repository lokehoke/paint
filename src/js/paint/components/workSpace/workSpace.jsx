'use strict';

const React = require('react');

const MainCanvas = require('./canvas/canvas.jsx');
const Instrumenst = require('./instruments/instruments.jsx');
const WindowWrapper = require('./windows/windowWrapper.jsx');

class WorkSpace extends React.Component {
    render() {
        return (
            <div className="workSpace">
                <Instrumenst />
                <MainCanvas />
                <WindowWrapper />
            </div>
        );
    }
}

module.exports = WorkSpace;
