'use strict';

import React from 'react';
import { connect } from 'react-redux';

class File extends React.Component {
    constructor(props) {
        super(props);

        this._createNewFile = this._createNewFile.bind(this)
    }

    render() {
        return (
            <div className="header__container">
                <span className="headerContainer__title">file</span>
                <ul className="headerContainer__subMenu">
                    <li>
                        <span className="newFile" ref={nf => this._newFile = nf} >
                            New file
                        </span>
                    </li>
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this._newFile.addEventListener('click', this._createNewFile);
    }

    _createNewFile() {
        this.props.newFile();
    }
}

export default connect(
    null,
    dispatch => ({
        newFile: () => {
            dispatch({
                type: 'OPEN_WINDOW',
                view: 'newFile',
            })
        },
    })
)(File);
