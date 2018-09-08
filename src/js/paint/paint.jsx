'use strict';

const React = require('react');
const Redux = require('redux');
const ReactRedux = require('react-redux');

const setting = require('!./settings/defaultSetting.json');

const rootReducer = (require('./reducers/getRootReducer.js'))(setting);

module.exports = class Paint {
    constructor(selector) {
        this._mountPoint = document.querySelector(selector);
        this._store = Redux.createStore(rootReducer);
    }
}
