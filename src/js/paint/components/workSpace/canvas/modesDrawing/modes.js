'use strict';

import Brush from './own/brush.js';

export default class Modes {
    constructor() {
        this._brush = Brush;
    }

    getMode(mode) {
        switch (mode) {
            case 'brush':
                return this._brush;
        }
    }
}
