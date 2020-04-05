'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import DropWindow from './dropWindow';
import { WindowClass } from '../../structDate/window';

interface IRootState {
    openedWindows: {
        own: Array<WindowClass>;
    };
}

const connector = connect((state: IRootState) => ({
    openedWindows: state.openedWindows.own,
}));

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType;

class DragAndDropWindowWrapper extends React.Component {
    static defaultProps = {
        openedWindows: [],
    };

    props: PropsType;

    render(): React.ReactNode {
        return this.props.openedWindows.map((el) => <DropWindow id={el.id} element={el} key={el.id} />);
    }
}

export default connector(DragAndDropWindowWrapper);
