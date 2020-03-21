'use strict';

import React from 'react';

import SizeLine from './own/lineSize.jsx';
import Color from './own/color.jsx';

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

export default Footer;