'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { closeTabAction } from '../../../../actions/tabActions';
import { InfoTab } from '../../../../structDate/infoTab';

interface IRootState {
    tabs: {
        own: Array<InfoTab>;
        activeTab: number;
    };
}

interface IProps {
    tabId: number;
}

const connector = connect(
    (state: IRootState, props: IProps) => ({
        tab: state.tabs.own.find((el: InfoTab) => el.id === props.tabId),
        active: state.tabs.activeTab,
    }),
    (dispatch) => ({
        closeTab: (id: number) => dispatch(closeTabAction(id)),
    }),
);

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType & IProps;

class Tab extends React.Component {
    props: PropsType;

    private _exitBtn: HTMLDivElement;
    private _tab: HTMLDivElement;

    render() {
        let active = '';

        if (this.props.tabId === this.props.active) {
            active = 'active';
        }

        return (
            <div className={`tab ${active}`} data-id={this.props.tabId} ref={(tab) => (this._tab = tab)}>
                {`${this.props.tab.title} ${this.props.tab.size.x} : ${this.props.tab.size.y}`}
                <div className='__exitIcon' ref={(exit) => (this._exitBtn = exit)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.props.closeTab(this.props.tab.id);

            return false;
        });
    }
}

export default connector(Tab);
