'use strict';

import { WindowActionType, OPEN_WINDOW, CLOSE_WINDOW } from '../../actions/openedWindowsActions'
import { WindowClass, View } from '../../structDate/window'

interface IState {
    id: number;
    own: Array<WindowClass>;
};

let id: number = 0;
let def: IState = {
    id,
    own: [],
};

export const getOpenedWindows = () => (state: IState = def, action: WindowActionType) => {
    switch (action.type) {
        case OPEN_WINDOW:
            if (state.own.some(el => el.view === action.view)) {
                return state;
            } else {
                let newWindow: WindowClass = new WindowClass(id + 1, action.view)
                return {
                    id: ++id,
                    own: [...state.own, newWindow],
                };
            }

        case CLOSE_WINDOW:
            return {
                id,
                own: [...(state.own.filter(el => el.id !== action.id))]
            };

        default:
            return state;
    }
};