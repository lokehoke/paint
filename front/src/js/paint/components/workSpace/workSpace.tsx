'use strict';

import React from 'react';

import Instruments from './instruments/instruments';
import ListTabsHeader from './canvas/tabsHeaders/listTabsHeader';
import TabsWrapper from './canvas/tabsWrapper';

export default class WorkSpace extends React.Component {
    render(): React.ReactNode {
        return (
            <div className='workSpace'>
                <Instruments />
                <div className='canvasWrapper'>
                    <ListTabsHeader />
                    <TabsWrapper />
                </div>
            </div>
        );
    }
}
