'use strict';

import { Vector2 } from './vector2';

export class InfoTab {
    public readonly id: number;
    public readonly title: string;
    public readonly size: Vector2;

    constructor(id: number, title: string, size: Vector2) {
        this.id = id;
        this.title = title;
        this.size = size;
    }
}
