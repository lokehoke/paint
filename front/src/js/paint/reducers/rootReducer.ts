'use strict';

import { combineReducers } from 'redux';

import { tabs } from './ownReducers/tabs';
import { openedWindows } from './ownReducers/openedWindows';
import { sizeScreen } from './ownReducers/sizeScreen';
import { instruments } from './ownReducers/instruments';

export const rootReducer = combineReducers({
    tabs,
    openedWindows,
    sizeScreen,
    instruments,
});
