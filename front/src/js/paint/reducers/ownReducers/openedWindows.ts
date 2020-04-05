'use strict';

import { WindowActionType, OPEN_WINDOW, CLOSE_WINDOW } from '../../actions/openedWindowsActions';
import { WindowClass } from '../../structDate/window';

interface IState {
    id: number;
    activeWindow: number;
    own: Array<WindowClass>;
}

const def: IState = {
    id: -1,
    activeWindow: -1,
    own: [],
};

export const openedWindows = (state: IState = def, action: WindowActionType): IState => {
    switch (action.type) {
        case OPEN_WINDOW:
            if (state.own.some((el) => el.view === action.view)) {
                return state;
            } else {
                const newWindow: WindowClass = new WindowClass(state.id + 1, action.view);
                return {
                    id: state.id + 1,
                    activeWindow: state.id + 1,
                    own: [...state.own, newWindow],
                };
            }

        case CLOSE_WINDOW:
            const own = [...state.own.filter((el) => el.id !== action.id)];
            let activeWindow = state.activeWindow;

            if (action.id === state.activeWindow) {
                if (own[own.length - 1]) {
                    activeWindow = own[own.length - 1].id;
                } else {
                    activeWindow = -1;
                }
            }

            return {
                ...state,
                activeWindow,
                own,
            };

        default:
            return state;
    }
};
