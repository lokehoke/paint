'use strict';

import vector2 from '../../structDate/vector2.js';

export default class DefaultConfig {
    constructor() {
        this.startAsync = true;
        this.ignoreNoDragAndDrop = false;
        this.showAfterMount = {
            isset: false,
            type: 'flex',
            sizeItem: new vector2(),
        };
        this.onlyX = false;
        this.onlyY = false;
        this.piece = {
            exist: false,
            min: new vector2(),
            max: new vector2(),
            step: new vector2(),
            exitFromContour: false,
            cur: new vector2(),
        };
        this.transferDate = () => {};
    }
};
