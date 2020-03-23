'use strict';

export const CHANGE_LINE_THICKNESS = 'CHANGE_LINE_THICKNESS';
export const CHANGE_INSTRUMENTS    = 'CHANGE_INSTRUMENTS';
export const CHANGE_COLOR          = 'CHANGE_COLOR';

interface IChangeLineThicknessAction {
    type: typeof CHANGE_LINE_THICKNESS;
    currentLineThickness: number;
};

interface IChangeInstrumentsActinon {
    type: typeof CHANGE_INSTRUMENTS;
    currentInstruments: string; // TODO ENUM
};

interface IChangeColorAction {
    type: typeof CHANGE_COLOR;
    currentColor: string;
};

export type InstrumentsActionType = IChangeLineThicknessAction | IChangeInstrumentsActinon | IChangeColorAction;

export function changeLineThicknessAction(l: number) : InstrumentsActionType {
    return {
        type: CHANGE_LINE_THICKNESS,
        currentLineThickness: l,
    };
};

export function changeInstrumentsAction(ins: string) : InstrumentsActionType {
    return {
        type: CHANGE_INSTRUMENTS,
        currentInstruments: ins,
    };
};

export function changeColorAction(color: string) : InstrumentsActionType {
    return {
        type: CHANGE_COLOR,
        currentColor: color,
    };
};