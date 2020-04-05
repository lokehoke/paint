'use strict';

import { EView } from '../structDate/window';

export const OPEN_WINDOW = 'OPEN_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

interface IOpenWindowAction {
    type: typeof OPEN_WINDOW;
    view: EView;
}

interface ICloseWindowAction {
    type: typeof CLOSE_WINDOW;
    id: number;
}

export type WindowActionType = IOpenWindowAction | ICloseWindowAction;

export function newWindowAction(view: EView): WindowActionType {
    return {
        type: OPEN_WINDOW,
        view,
    };
}

export function closeWindowAction(id: number): WindowActionType {
    return {
        type: CLOSE_WINDOW,
        id,
    };
}
