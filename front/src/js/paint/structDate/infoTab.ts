'use strict';

import { Vector2 } from './vector2';

export class InfoTab {
    id: number;
    title: string;
    size: Vector2;
    
    constructor(id: number, title: string, size: Vector2) {
        this.id    = id;
        this.title = title;
        this.size  = size;
    }
}
