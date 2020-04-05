'use strict';

export enum EView {
    newFile,
    basicInstrument,
    palette,
}

export class WindowClass {
    public readonly id: number;
    public readonly title: string;
    public readonly view: EView;

    constructor(id: number, view: EView) {
        this.id = id;
        this.view = view;
        this.title = this._getTitle(view);
    }

    private _getTitle(view: EView): string {
        switch (view) {
            case EView.newFile:
                return 'Create new file';
            case EView.basicInstrument:
                return 'Basic Instrument';
            case EView.palette:
                return 'Palette';
            default:
                return '';
        }
    }
}
