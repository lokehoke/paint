'use strict';

import { BrushMode } from './own/brush';
import { IModeContext } from '../../reducers/ownReducers/instruments'

export class ModeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ModeError";
    }
}

export enum EInstrumentMode {
    brush = 'brush',
}

export interface IModeType {
    type: EInstrumentMode;

    updateContext  : (context: IModeContext) => void;
    setListeners   : (canv: HTMLCanvasElement) => void;
    deleteListeners: () => void;
}

export class Modes {
    static brush = BrushMode;

    static getMode(mode: EInstrumentMode): IModeType {
        switch (mode) {
            case EInstrumentMode.brush:
                return new BrushMode();
            default:
                throw new ModeError(`unknown mode: ${mode}`);
        }
    }
}