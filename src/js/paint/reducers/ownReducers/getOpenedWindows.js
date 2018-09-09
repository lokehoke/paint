'use strict';

let id = 0;

module.exports = () => (state = [], action) => {
    let title = '';
    switch (action.type) {
        case 'OPEN_WINDOW':
            if (action.view === 'newFile') {
                title = 'Create new file';

                if (state.some(el => el.view === 'newFile')) {
                    return state;
                }
            }

            return [...state, {
                id: id++,
                view: action.view,
                title
            }];
            break;
        case 'CLOSE_WINDOW':
            return [...(state.filter(el => el.id !== action.id))];
            break;
        default:
            return state;
    }
};
