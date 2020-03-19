'use strict';

module.exports = class Modes {
    constructor() {
        this._brush = require('./own/brush.js');
    }

    getMode(mode) {
        switch (mode) {
            case 'brush':
                return this._brush;
        }
    }
}
