'use strict';

let def = {
    height: window.innerHeight,
    width: window.innerWidth
};

module.exports = () => (state = def, action) => {
    switch (action.type) {
        case 'CHANGE_SIZE_SCREEN':
            return action.size;
            break;
        default:
            return state;
    }
};
