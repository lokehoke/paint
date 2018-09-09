'use strict';

module.exports = () => (state = 0, action) => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_TAB':
            return action.activeTab;
            break;
        default:
            return state;
    }
};
