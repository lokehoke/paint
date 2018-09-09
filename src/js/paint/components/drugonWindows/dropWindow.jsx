'use strict';

const React = require('react');

const NewFile = require('./dropMain/newFile.jsx');

class DrugonWindowWrapper extends React.Component {
    render() {
        return (
            <div className="dropWindow">
                <header>
                    {this.props.element.title}
                </header>
                <main>
                    {this._getMain(this.props.element)}
                </main>
            </div>
        );
    }

    _getMain(el) {
        let main = null;

        switch (el.view) {
            case 'newFile':
                main = this._getNewFileMain();
                break;
        }

        return main;;
    }

    _getNewFileMain() {
        return <NewFile />;
    }
}


module.exports = DrugonWindowWrapper;
