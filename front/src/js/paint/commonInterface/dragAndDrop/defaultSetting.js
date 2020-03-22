'use strict';

import { Vector2 } from './../../structDate/vector2.ts';

export default class DefaultConfig {
    constructor() {
        this.startAsync = true;
        this.ignoreNoDragAndDrop = false;
        this.showAfterMount = {
            isset: false,
            type: 'flex',
            sizeItem: new Vector2(),
        };
        this.onlyX = false;
        this.onlyY = false;
        this.piece = {
            exist: false,
            min: new Vector2(),
            max: new Vector2(),
            step: new Vector2(),
            exitFromContour: false,
            cur: new Vector2(),
        };
        this.transferDate = () => {};
    }
};
