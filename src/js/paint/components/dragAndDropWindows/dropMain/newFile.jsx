'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

class NewFile extends React.Component {
    render() {
        return (
            <div className="newFile">
                <div>
                    <span>Title&nbsp;</span>
                    <input ref={inp => this.title = inp} maxLength="10" />
                </div>
                <div>
                    <span>Size&nbsp;</span>
                    <input ref={inp => this.x = inp} type="number" max="10000" min="0" />
                    &nbsp;x&nbsp;
                    <input ref={inp => this.y = inp} type="number" max="10000" min="0" />
                </div>
                <div>
                    <button ref={btn => this.createBtn = btn}>Create</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.createBtn.addEventListener(('click'), e => {
            let x = this._getValue('x');
            let y = this._getValue('y');
            let title = (this.title.value !== '' ? this.title.value : 'untitled');

            this.props.deleteThisTab(this.props.id);
            this.props.createNew(x, y, title);
        });
    }

    _getValue(type) {
        if (+this[type].value > 10000 || +this[type].value <= 0 || this[type].value === '') {
            if (type === 'x') {
                return 1080;
            } else {
                return 1920;
            }
        } else {
            return +this[type].value;
        }
    }
}


module.exports = ReactRedux.connect(
    state => ({
    }),
    dispatch => ({
        createNew: (x, y, title) => {
            dispatch({
                type: 'NEW_TAB',
                size: {
                    x,
                    y
                },
                title
            });
        },
        deleteThisTab: id => {
            dispatch({
                type: 'CLOSE_WINDOW',
                id
            })
        }
    })
)(NewFile);
