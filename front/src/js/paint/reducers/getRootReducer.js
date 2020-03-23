'use strict';

import { combineReducers } from 'redux';

import { getTabs } from './ownReducers/getTabs';
import getOpenedWindows from './ownReducers/getOpenedWindows';
import { getSizeScreen } from './ownReducers/getSizeScreen';
import { getInstruments } from './ownReducers/getInstruments';

export default settings => combineReducers({
    tabs: getTabs(JSON.parse(JSON.stringify(settings))),
    openedWindows: getOpenedWindows(JSON.parse(JSON.stringify(settings))),
    sizeScreen: getSizeScreen(JSON.parse(JSON.stringify(settings))),
    instruments: getInstruments(JSON.parse(JSON.stringify(settings))),
});