'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { newWindowAction } from '../../../actions/openedWindowsActions';
import { View } from '../../../structDate/window';

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
                    <li ref={nf => this._newFile = nf}>
                        <span className="newFile">
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
        newFile: () => dispatch(newWindowAction(View.newFile)),
    })
)(File);
