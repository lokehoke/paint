'use strict';

import { Vector2 } from '../../structDate/vector2';

export interface IShowAfterMount {
    isset: boolean;
    sizeItem: Vector2;
    type?: string;
}

export interface IPiece {
    exist: boolean;
    min: Vector2;
    max: Vector2;
    step: Vector2;
    cur: Vector2;
    exitFromContour?: boolean;
}

export interface IConfigDragAndDrop {
    startAsync?: boolean;
    ignoreNoDragAndDrop?: boolean;
    onlyX?: boolean;
    onlyY?: boolean;
    transferDate?: Function;
    showAfterMount?: IShowAfterMount;
    piece?: IPiece;
}

export type ConfigDragAndDropType = IConfigDragAndDrop | null | undefined;

export class ConfigDragAndDrop implements IConfigDragAndDrop {
    startAsync: boolean = true;
    ignoreNoDragAndDrop: boolean = false;
    onlyX: boolean = false;
    onlyY: boolean = false;
    transferDate: Function = () => {};
    showAfterMount: IShowAfterMount = {
        isset: false,
        sizeItem: new Vector2(),
        type: 'flex',
    };
    piece: IPiece = {
        exist: false,
        min: new Vector2(),
        max: new Vector2(),
        step: new Vector2(),
        exitFromContour: false,
        cur: new Vector2(),
    };
};
