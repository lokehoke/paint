'use strict';

import React from 'react';

import SizeLine from './own/lineSize';
import Color from './own/color';

export class Footer extends React.Component {
    render(): React.ReactNode {
        return (
            <footer className='footer'>
                <SizeLine />
                <Color />
            </footer>
        );
    }
}
