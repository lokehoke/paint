'use strict';

let id = 0;
let def = {
    id,
    own: [],
};

export default () => (state = def, action) => {
    let title = '';

    switch (action.type) {
        case 'OPEN_WINDOW':
            switch (action.view) {
                case 'newFile':
                    title = 'Create new file';
                    break;
                case 'basicInstrument':
                    title = 'Basic Instrument';
                    break;
                case 'palette':
                    title = 'Palette';
                    break;
            }

            if (state.own.some(el => el.view === action.view)) {
                return state;
            } else {
                return {
                    id: id + 1,
                    own: [...state.own, {
                        id: id++,
                        view: action.view,
                        title,
                    }]
                };
            }

        case 'CLOSE_WINDOW':
            return {
                id,
                own: [...(state.own.filter(el => el.id !== action.id))]
            };

        default:
            return state;
    }
};
