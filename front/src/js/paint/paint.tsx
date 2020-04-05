'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/rootReducer';

import Header from './components/header/header';
import WorkSpace from './components/workSpace/workSpace';
import { Footer } from './components/footer/footer';
import DragAndDropWindowWrapper from './components/dragAndDropWindows/dragAndDropWindowsWrapper';
import { Vector2 } from './structDate/vector2';
import { ChangeSizeScreenAction } from './actions/sizeScreenActions';

export default class Paint {
    private _mountPoint: HTMLElement;
    private _store: Store;
    constructor(selector: string) {
        this._mountPoint = document.querySelector(selector);
        this._store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

        window.onresize = (): void => {
            this._store.dispatch(ChangeSizeScreenAction(new Vector2(window.innerHeight, window.innerWidth)));
        };

        render(
            <Provider store={this._store}>
                <div className='paintWrapper'>
                    <Header />
                    <WorkSpace />
                    <Footer />
                    <DragAndDropWindowWrapper />
                </div>
            </Provider>,
            this._mountPoint,
        );

        document.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    }
}
