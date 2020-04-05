'use strict';

import { Vector2 } from '../structDate/vector2';

export const CHANGE_SIZE_SCREEN = 'CHANGE_SIZE_SCREEN';

interface INewTabAction {
    type: typeof CHANGE_SIZE_SCREEN;
    size: Vector2;
}

export type SizeScreenActionType = INewTabAction;

export function ChangeSizeScreenAction(size: Vector2): SizeScreenActionType {
    return {
        type: CHANGE_SIZE_SCREEN,
        size,
    };
}
