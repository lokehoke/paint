'use strict';

const Redux = require('redux');

module.exports = settings => {
    const currentColor = (require('./ownReducers/getCurrentColor.js'))(settings.currentColor);
    const currentLineThickness = (require('./ownReducers/getCurrentLineThickness.js'))(settings.currentLineThickness);
    const currentInstruments = (require('./ownReducers/getCurrentInstruments.js'))(settings.currentInstruments);

    return Redux.combineReducers({
        currentColor,
        currentLineThickness,
        currentInstruments
    });;
}
