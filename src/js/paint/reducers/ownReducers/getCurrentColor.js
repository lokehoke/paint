'use strict';

module.exports = defaultColor => {
    return (state = defaultColor, action) => {
        switch (action.type) {
            case 'CHANGE_COLOR':
                return action.color;
                break;
            default:
                return state;
        }
    };
};
