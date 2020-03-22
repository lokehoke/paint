'use strict';

import { Vector2 } from '../structDate/vector2';

export const NEW_TAB           = 'NEW_TAB';
export const CLOSE_TAB         = 'CLOSE_TAB';
export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';

interface INewTabAction {
    type: typeof NEW_TAB;
    title: string;
    size: Vector2;
};

interface ICloseTabAction {
    type: typeof CLOSE_TAB;
    id: number;
};

interface IChangeActiveTabAction {
    type: typeof CHANGE_ACTIVE_TAB;
    activeTab: number;
};

export type TabActionType = INewTabAction | ICloseTabAction | IChangeActiveTabAction;

export function newTabAction(title: string, size: Vector2) : TabActionType {
    return {
        type: NEW_TAB,
        title,
        size,
    };
};

export function closeTabAction(id: number) : TabActionType {
    return {
        type: CLOSE_TAB,
        id,
    };
};

export function changeTabAction(activeTab: number) : TabActionType {
    return {
        type: CHANGE_ACTIVE_TAB,
        activeTab,
    };
};