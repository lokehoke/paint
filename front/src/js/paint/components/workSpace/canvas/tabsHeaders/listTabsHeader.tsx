'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Tab from './tabHeader';
import { changeTabAction } from '../../../../actions/tabActions';
import { InfoTab } from '../../../../structDate/infoTab';

interface IRootState {
    tabs: {
        own: Array<InfoTab>,
        activeTab: number,
    };
};

interface IProps {
    tabs: Array<InfoTab>,
    activeTab: number,
}

let connector = connect(
    (state: IRootState) => ({
        tabs: state.tabs.own,
        active: state.tabs.activeTab,
    }),
    dispatch =>({
        changeActive: (id: number) => dispatch(changeTabAction(id)),
    })
);

type PropsReduxType = ConnectedProps<typeof connector>
export type PropsType = PropsReduxType & IProps;

class ListTabs extends React.Component {
    props: PropsType;

    private _listTabs: HTMLDivElement;

    render() {
        return (
            <div className="listTabs" ref={(lt: HTMLDivElement) => this._listTabs = lt}>
                {this.props.tabs.map(tab => (
                    <Tab key={tab.id} tabId={tab.id} />
                ))}
            </div>
        );
    }

    componentDidMount() {
        this._listTabs.addEventListener('click', (e: MouseEvent) => {
            let target = (e.target as HTMLDivElement);
            if(target.classList.contains('tab')) {
                this.props.changeActive(+target.dataset.id);
            }
        });
    }
}

export default connector(ListTabs);