'use strict';

import { CHANGE_LINE_THICKNESS, CHANGE_COLOR, InstrumentsActionType, CHANGE_ACTIVE_INSTRUMENTS } from "../../actions/instrumentsActions";
import { Color } from "../../structDate/color";
import { EInstrumentMode } from '../../ctx/drawingModes/modes'

export interface IState {
    currentColor        : Color;
    currentLineThickness: number;
    activeInstrument    : EInstrumentMode.brush;
    currentInstruments  : Array<EInstrumentMode>;
};

export type IModeContext = IState;

export const def: IState = {
    currentColor        : new Color(),
    currentLineThickness: 16,
    activeInstrument    : EInstrumentMode.brush,
    currentInstruments  : [
        EInstrumentMode.brush,
    ],
};

export const instruments = (state: IState = def, action: InstrumentsActionType): IState => {
    switch (action.type) {
        case CHANGE_LINE_THICKNESS:
            return {
                ...state,
                currentLineThickness: action.currentLineThickness,
            };

        case CHANGE_ACTIVE_INSTRUMENTS:
            return {
                ...state,
                activeInstrument: action.activeInstrument,
            };

        case CHANGE_COLOR:
            return {
                ...state,
                currentColor: action.currentColor,
            };

        default:
            return state;
    }
};