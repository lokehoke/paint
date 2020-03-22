'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { screenSizeRestrictions as ssr } from './../../../settings/globalSetting.json';

class NewFile extends React.Component {
    constructor(props) {
        super(props);

        this._clickNewFile = this._clickNewFile.bind(this)
        this._getValue     = this._getValue.bind(this);
    }
    
    render() {
        return (
            <div className="newFile">
                <div>
                    <span>Title&nbsp;</span>
                    <input ref={inp => this.title = inp} maxLength="10" />
                </div>
                <div>
                    <span>Size&nbsp;</span>
                    <input ref={inp => this.x = inp} type="number" max={ssr['x'].max} min={ssr['x'].min} />
                    &nbsp;x&nbsp;
                    <input ref={inp => this.y = inp} type="number" max={ssr['y'].max} min={ssr['y'].min} />
                </div>
                <div>
                    <button ref={btn => this.createBtn = btn}>Create</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.createBtn.addEventListener('click', this._clickNewFile);

        // document.addEventListener('keyup', e => { // TODO need active dropWindow
        //     console.log(e);
            
        //     if (e.keyCode === 13) {
        //         return this._clickNewFile(e);
        //     }
        // });
    }

    _clickNewFile(e) {
        e.preventDefault();

        let x = this._getValue('x');
        let y = this._getValue('y');
        let title = (this.title.value !== '' ? this.title.value : 'untitled');

        this.props.deleteThisTab(this.props.id);
        this.props.createNew(x, y, title);
        
        return false;
    }

    _getValue(type) {
        if (+this[type].value > ssr[type].max || +this[type].value <= ssr[type].min || this[type].value === '') {
            return ssr[type].default;
        } else {
            return +this[type].value;
        }
    }
}

export default connect(
    null,
    dispatch => ({
        createNew: (x, y, title) => {
            dispatch({
                type: 'NEW_TAB',
                size: {
                    x,
                    y,
                },
                title,
            });
        },
        deleteThisTab: id => {
            dispatch({
                type: 'CLOSE_WINDOW',
                id,
            })
        },
    })
)(NewFile);
