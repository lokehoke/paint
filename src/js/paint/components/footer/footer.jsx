'use strict';

const React = require('react');

const SizeLine = require('./own/lineSize.jsx');
const Color = require('./own/color.jsx');

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <SizeLine />
                <Color />
            </footer>
        );
    }
}

module.exports = Footer;
