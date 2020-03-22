'use strict';

import InfoTab from './../../structDate/infoTab.js';

let def = {
    id: -1,
    activeTab: -1,
    own: [],
};

export default () => (state = def, action) => {
    switch (action.type) {
        case 'NEW_TAB':
            return Object.assign({}, state, {
                id: +state.id + 1,
                activeTab: +state.id + 1,
                own: [
                    ...state.own,
                    new InfoTab(state.id + 1, action.title, action.size),
                ],
            });

        case 'CLOSE_TAB':
            let own = [...(state.own.filter(el => el.id !== action.id))];
            let activeTab = state.activeTab;

            if (+action.id === +state.activeTab) {
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

            case 'CHANGE_ACTIVE_TAB':
                return Object.assign({}, state, {
                    activeTab: +action.activeTab,
                });

            default:
               return state;
    }
}