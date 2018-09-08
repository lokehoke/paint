'use strict';

module.exports = defaultInstruments => (state = defaultInstruments, action) => {
    switch (action.type) {
        case 'CHANGE_INSTRUMENTS':
            return action.instruments;
            break;
        default:
            return state;
    }
};
