'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import DropWindow from './dropWindow.jsx';

class DragAndDropWindowWrapper extends React.Component {
    static defaultProps = {
        openedWindows: [],
    };

    static propTypes = {
        openedWindows: array,
    };

    render() {
        return this.props.openedWindows.map((el, i) =>
            <DropWindow element={el} key={el.id} />
        );
    }
}

export default connect(
    state => ({
        openedWindows: state.openedWindows.own,
    }),
)(DragAndDropWindowWrapper);
