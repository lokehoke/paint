'use strict';

let id = 0;
let def = {
    id,
    own: []
};

module.exports = () => (state = def, action) => {
    let title = '';
    switch (action.type) {
        case 'OPEN_WINDOW':
            if (action.view === 'newFile') {
                title = 'Create new file';

                if (state.own.some(el => el.view === 'newFile')) {
                    return state;
                }
            }

            return {
                id: id + 1,
                own: [...state.own, {
                    id: id++,
                    view: action.view,
                    title
                }]
            };
        case 'CLOSE_WINDOW':
            return {
                id,
                own: [...(state.own.filter(el => el.id !== action.id))]
            };
        default:
            return state;
    }
};
