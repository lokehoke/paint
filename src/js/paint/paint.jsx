'use strict';

const React = require('react');
const ReactDom = require('react-dom');
const Redux = require('redux');
const ReactRedux = require('react-redux');
const Provider = ReactRedux.Provider;

const setting = require('!./settings/defaultSetting.json');
const rootReducer = (require('./reducers/getRootReducer.js'))(setting);

const Header = require('./components/header/header.jsx');
const WorkSpace = require('./components/workSpace/workSpace.jsx');
const Footer = require('./components/footer/footer.jsx');
const DrugonWindowWrapper = require('./components/drugonWindows/drugonWindowsWrapper.jsx');

module.exports = class Paint {
    constructor(selector) {
        this._mountPoint = document.querySelector(selector);
        this._store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
           serialize: true
        }));

        ReactDom.render(
            <Provider store={this._store}>
                <div className="paintWrapper">
                    <Header />
                    <WorkSpace />
                    <Footer />
                    <DrugonWindowWrapper />
                </div>
             </Provider>,
            this._mountPoint
        );
    }
}
