'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import setting from './settings/defaultSetting.json';

import RootReducer from './reducers/getRootReducer.js';
const rootReducer = RootReducer(setting);

import Header from './components/header/header.jsx';
import WorkSpace from './components/workSpace/workSpace.jsx';
import Footer from './components/footer/footer.jsx';
import DragAndDropWindowWrapper from './components/dragAndDropWindows/dragAndDropWindowsWrapper.jsx';

export default class Paint {
    constructor(selector) {
        this._mountPoint = document.querySelector(selector);
        this._store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
           serialize: true,
        }));

        window.onresize = () => {
            this._store.dispatch({
                type: 'CHANGE_SIZE_SCREEN',
                size: {
                    height: window.innerHeight,
                    width: window.innerWidth,
                },
            });
        };

        render(
            <Provider store={this._store}>
                <div className="paintWrapper">
                    <Header />
                    <WorkSpace />
                    <Footer />
                    <DragAndDropWindowWrapper />
                </div>
             </Provider>,
            this._mountPoint
        );

        document.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        });

        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        });
    }
}