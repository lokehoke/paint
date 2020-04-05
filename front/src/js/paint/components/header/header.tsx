'use strict';

import React from 'react';

import File from './own/file';
import Windows from './own/windows';

class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <header className='header'>
                <File />
                <Windows />
            </header>
        );
    }
}

export default Header;
