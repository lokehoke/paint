'use strict';

let id = 0;

module.exports = () => (state = [], action) => {
    switch (action.type) {
        case 'NEW_TAB':
            return [...state, {
                id: id++,
                title: action.title,
                size: action.size,
                live: true
            }];
            break;
        case 'CLOSE_TAB':
            return [...(state.filter(el => el.id !== action.id))];
            break;
        default:
            return state;
    }
};
