'use strict';

const Redux = require('redux');

module.exports = settings => {
    const currentColor = (require('./ownReducers/getCurrentColor.js'))(settings.currentColor);
    const currentLineThickness = (require('./ownReducers/getCurrentLineThickness.js'))(settings.currentLineThickness);

    return Redux.combineReducers({
        currentColor,
        currentLineThickness
    });;
}
