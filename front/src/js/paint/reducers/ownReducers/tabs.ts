'use strict';

import { InfoTab } from '../../structDate/infoTab';
import { TabActionType, NEW_TAB, CLOSE_TAB, CHANGE_ACTIVE_TAB } from '../../actions/tabActions';

interface IState {
    id: number;
    activeTab: number;
    own: Array<InfoTab>;
}

const def: IState = {
    id: -1,
    activeTab: -1,
    own: [],
};

export const tabs = (state: IState = def, action: TabActionType): IState => {
    switch (action.type) {
        case NEW_TAB:
            return {
                ...state,
                id: state.id + 1,
                activeTab: state.id + 1,
                own: [...state.own, new InfoTab(state.id + 1, action.title, action.size)],
            };

        case CLOSE_TAB:
            const own = [...state.own.filter((el) => el.id !== action.id)];
            let activeTab = state.activeTab;

            if (action.id === state.activeTab) {
                if (own[own.length - 1]) {
                    activeTab = own[own.length - 1].id;
                } else {
                    activeTab = -1;
                }
            }

            return {
                ...state,
                activeTab,
                own,
            };

        case CHANGE_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.activeTab,
            };

        default:
            return state;
    }
};
