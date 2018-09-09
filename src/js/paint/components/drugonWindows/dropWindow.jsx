'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome').FontAwesomeIcon;
const faTimesCircle = require('@fortawesome/free-solid-svg-icons').faTimesCircle;

const NewFile = require('./dropMain/newFile.jsx');

class DrugonWindowWrapper extends React.Component {
    render() {
        return (
            <div className="dropWindow" ref={window => this.window = window}>
                <header>
                    {this.props.element.title}
                    <div className="__exitIcon" ref={exit => this.exitBtn = exit}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </div>
                </header>
                <main>
                    {this._getMain(this.props.element)}
                </main>
            </div>
        );
    }

    componentDidMount() {
        let h = 200;
        let w = 200;

        switch (this.props.element.view) {
            case 'newFile':
                h = 180;
                w = 260;
                break;
        }

        this.window.style.height = `${h}px`;
        this.window.style.width = `${w}px`;

        this.exitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.props.closeWindow(this.props.element.id);
            return false;
        });
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
        return <NewFile id={this.props.element.id}/>;
    }
}


module.exports = ReactRedux.connect(
    () => ({}),
    dispatch => ({
        closeWindow: id => {
            dispatch({
                type: 'CLOSE_WINDOW',
                id
            })
        }
    })
)(DrugonWindowWrapper);
