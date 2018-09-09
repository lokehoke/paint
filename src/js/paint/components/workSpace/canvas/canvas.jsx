'use strict';

const React = require('react');

const Tabs = require('./components/tabs.jsx');
const ListTabs = require('./components/listTabs.jsx');

class Canvas extends React.Component {
    render() {
        return (
            <div className="canvasWrapper">
                <ListTabs />
                <Tabs />
            </div>
        );
    }
}

module.exports = Canvas;
