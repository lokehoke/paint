'use strict';

export enum View {
    newFile,
    basicInstrument,
    palette,
}

export class WindowClass {
    public id: number;
    public title: string;
    public view: View;

    constructor(id: number, view: View) {
        this.id = id;
        this.view = view;
        this.title = this._getTitle(view);
    }

    private _getTitle(view: View): string {
        switch (view) {
            case View.newFile:
                return 'Create new file';
            case View.basicInstrument:
                return 'Basic Instrument';
            case View.palette:
                return 'Palette';
            default:
                return '';
        }
    }
}