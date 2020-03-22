'use strict';

import { InfoTab } from '../../structDate/infoTab';
import { TabActionType, NEW_TAB, CLOSE_TAB, CHANGE_ACTIVE_TAB } from '../../actions/tabActions';
import { Vector2 } from '../../structDate/vector2';

interface IState {
    id: number;
    activeTab: number;
    own: Array<InfoTab>;
}

let def: IState = {
    id: -1,
    activeTab: -1,
    own: [],
};

export const getTabs = () => function (state: IState = def, action: TabActionType) : IState {
    switch (action.type) {
        case NEW_TAB:
            return Object.assign({}, state, {
                id: state.id + 1,
                activeTab: state.id + 1,
                own: [
                    ...state.own,
                    new InfoTab(state.id + 1, action.title, action.size),
                ],
            });

        case CLOSE_TAB:
            let own = [...(state.own.filter(el => el.id !== action.id))];
            let activeTab = state.activeTab;

            if (action.id === +state.activeTab) {
                if (own[own.length - 1]) {
                    activeTab = +own[own.length - 1].id;
                } else {
                    activeTab = -1;
                }
            }

            return Object.assign({}, state, {
                activeTab,
                own,
            });

        case CHANGE_ACTIVE_TAB:
            return Object.assign({}, state, {
                activeTab: action.activeTab,
            });

        default:
            return state;
    }
}