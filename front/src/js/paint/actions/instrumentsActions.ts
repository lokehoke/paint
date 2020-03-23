'use strict';

export const CHANGE_LINE_THICKNESS     = 'CHANGE_LINE_THICKNESS';
export const CHANGE_ACTIVE_INSTRUMENTS = 'CHANGE_ACTIVE_INSTRUMENTS';
export const CHANGE_COLOR              = 'CHANGE_COLOR';

interface IChangeLineThicknessAction {
    type: typeof CHANGE_LINE_THICKNESS;
    currentLineThickness: number;
};

interface IChangeInstrumentsActinon {
    type: typeof CHANGE_ACTIVE_INSTRUMENTS;
    activeInstrument: string; // TODO it is enum
};

interface IChangeColorAction {
    type: typeof CHANGE_COLOR;
    currentColor: string;
};

export type InstrumentsActionType = IChangeLineThicknessAction | IChangeInstrumentsActinon | IChangeColorAction;

export function changeLineThicknessAction(l: number): InstrumentsActionType {
    return {
        type: CHANGE_LINE_THICKNESS,
        currentLineThickness: l,
    };
};

export function changeActiveInstrumentsAction(ins: string): InstrumentsActionType {
    return {
        type: CHANGE_ACTIVE_INSTRUMENTS,
        activeInstrument: ins,
    };
};

export function changeColorAction(color: string): InstrumentsActionType {
    return {
        type: CHANGE_COLOR,
        currentColor: color,
    };
};