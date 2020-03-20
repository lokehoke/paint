'use strict';

let def = {
    height: window.innerHeight,
    width: window.innerWidth,
};

export default () => (state = def, action) => {
    switch (action.type) {
        case 'CHANGE_SIZE_SCREEN':
            return action.size;
        default:
            return state;
    }
};
