'use strict';

const React = require('react');

const File = require('./own/file.jsx');
const Windows =require('./own/windows.jsx');

class Header extends React.Component {
    render() {
        return (
            <header className="header" ref={h => this.header = h}>
                <File />
                <Windows />
            </header>
        );
    }
}

module.exports = Header;
