'use strict';

const React = require('react');

const File = require('./own/file.jsx');

class Header extends React.Component {
    render() {
        return (
            <header className="header" ref={h => this.header = h}>
                <File />
            </header>
        );
    }

    componentDidMount() {
        this.header.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        });
    }
}

module.exports = Header;
