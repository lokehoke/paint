'use strict';

import { CHANGE_LINE_THICKNESS, CHANGE_COLOR, InstrumentsActionType, CHANGE_ACTIVE_INSTRUMENTS } from "../../actions/instrumentsActions";

//TODO state type from json
export const getInstruments = settings => (state = settings, action: InstrumentsActionType) => {
    switch (action.type) {
        case CHANGE_LINE_THICKNESS:
            return Object.assign({}, state, {
                currentLineThickness: action.currentLineThickness,
            });

        case CHANGE_ACTIVE_INSTRUMENTS:
            return Object.assign({}, state, {
                activeInstrument: action.activeInstrument,
            });

        case CHANGE_COLOR:
            return Object.assign({}, state, {
                currentColor: action.currentColor,
            });

        default:
            return state;
    }
};