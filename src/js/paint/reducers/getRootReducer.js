'use strict';

const Redux = require('redux');

module.exports = settings => {
    const tabs = (require('./ownReducers/getTabs.js'))();
    const openedWindows = (require('./ownReducers/getOpenedWindows'))();
    const sizeScreen = require('./ownReducers/getSizeScreen')();
    const instruments = require('./ownReducers/getInstruments.js')(settings);

    return Redux.combineReducers({
        tabs,
        openedWindows,
        sizeScreen,
        instruments
    });;
}
