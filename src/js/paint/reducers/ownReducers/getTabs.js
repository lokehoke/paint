
const InfoTab = require('./../../structDate/infoTab.js');

let def = {
    id: -1,
    activeTab: -1,
    own: []
};

module.exports = () => (state = def, action) => {
    switch (action.type) {
        case 'NEW_TAB':
            return Object.assign({}, state, {
                id: +state.id + 1,
                activeTab: +state.id + 1,
                own: [
                    ...state.own,
                    new InfoTab(state.id + 1, action.title, action.size)
                ]
            });
        case 'CLOSE_TAB':
            let newOwn = [...(state.own.filter(el => el.id !== action.id))];

            return Object.assign({}, state, {
                activeTab: (
                    +action.id === +state.activeTab
                        ? (
                            newOwn[newOwn.length - 1]
                                ? +newOwn[newOwn.length - 1].id
                                : -1
                        )
                        : state.activeTab
                ),
                own: newOwn
            });
        case 'CHANGE_ACTIVE_TAB':
            return Object.assign({}, state, {
                activeTab: +action.activeTab
            });
        default:
            return state;
    }
};
