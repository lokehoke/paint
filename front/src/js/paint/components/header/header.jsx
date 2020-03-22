'use strict';

import React from 'react';

import File from './own/file.jsx';
import Windows from './own/windows.jsx';

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

export default Header;