'use strict';

let id = 0;

let def = {
    id,
    own: []
};

module.exports = () => (state = def, action) => {
    switch (action.type) {
        case 'NEW_TAB':
            return {
                id: id+1,
                own: [...state.own, {
                    id: id++,
                    title: action.title,
                    size: action.size,
                    live: true
                }]
            };
            break;
        case 'CLOSE_TAB':
            return {
                id,
                own: [...(state.own.filter(el => el.id !== action.id))]
            };
            break;
        default:
            return state;
    }
};
