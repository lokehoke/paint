'use strict';

module.exports = defaultLineThickness => (state = defaultLineThickness, action) => {
    switch (action.type) {
        case 'CHANGE_LINE_THICKNESS':
            return action.currentLineThickness;
            break;
        default:
            return state;
    }
}
