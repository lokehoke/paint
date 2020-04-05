'use strict';

import { EInstrumentMode } from '../ctx/drawingModes/modes';
import { Color } from '../structDate/color';

export const CHANGE_LINE_THICKNESS = 'CHANGE_LINE_THICKNESS';
export const CHANGE_ACTIVE_INSTRUMENTS = 'CHANGE_ACTIVE_INSTRUMENTS';
export const CHANGE_COLOR = 'CHANGE_COLOR';

interface IChangeLineThicknessAction {
    type: typeof CHANGE_LINE_THICKNESS;
    currentLineThickness: number;
}

interface IChangeInstrumentsActinon {
    type: typeof CHANGE_ACTIVE_INSTRUMENTS;
    activeInstrument: EInstrumentMode;
}

interface IChangeColorAction {
    type: typeof CHANGE_COLOR;
    currentColor: Color;
}

export type InstrumentsActionType = IChangeLineThicknessAction | IChangeInstrumentsActinon | IChangeColorAction;

export function changeLineThicknessAction(l: number): InstrumentsActionType {
    return {
        type: CHANGE_LINE_THICKNESS,
        currentLineThickness: l,
    };
}

export function changeActiveInstrumentsAction(ins: EInstrumentMode): InstrumentsActionType {
    return {
        type: CHANGE_ACTIVE_INSTRUMENTS,
        activeInstrument: ins,
    };
}

export function changeColorAction(color: Color): InstrumentsActionType {
    return {
        type: CHANGE_COLOR,
        currentColor: color,
    };
}
