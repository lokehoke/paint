'use strict';

const React = require('react');

const File = require('./own/file.jsx');

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <File />
            </header>
        );
    }
}

module.exports = Header;
