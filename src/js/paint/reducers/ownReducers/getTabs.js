'use strict';

let id = 0;

module.exports = () => (state = [], action) => {
    switch (action.type) {
        case 'NEW_TAB':
            return [...state, {
                id,
                title: action.title,
                size: action.size
            }];
            break;
        default:
            return state;
    }
};
