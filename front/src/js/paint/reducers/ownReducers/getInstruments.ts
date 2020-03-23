'use strict';

import { CHANGE_LINE_THICKNESS, CHANGE_INSTRUMENTS, CHANGE_COLOR, InstrumentsActionType } from "../../actions/instrumentsActions";

//TODO state type from json
export const getInstruments = settings => (state = settings, action: InstrumentsActionType) => {
    switch (action.type) {
        case CHANGE_LINE_THICKNESS:
            return Object.assign({}, state, {
                currentLineThickness: action.currentLineThickness,
            });

        case CHANGE_INSTRUMENTS:
            return Object.assign({}, state, {
                currentInstruments: action.currentInstruments,
            });

        case CHANGE_COLOR:
            return Object.assign({}, state, {
                currentColor: action.currentColor,
            });

        default:
            return state;
    }
};