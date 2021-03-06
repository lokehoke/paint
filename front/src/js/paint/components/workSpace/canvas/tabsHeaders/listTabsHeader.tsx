'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Tab from './tabHeader';
import { changeTabAction } from '../../../../actions/tabActions';
import { InfoTab } from '../../../../structDate/infoTab';

interface IRootState {
    tabs: {
        own: Array<InfoTab>;
        activeTab: number;
    };
}

interface IProps {
    tabs: Array<InfoTab>;
    activeTab: number;
}

const connector = connect(
    (state: IRootState) => ({
        tabs: state.tabs.own,
        active: state.tabs.activeTab,
    }),
    (dispatch) => ({
        changeActive: (id: number): void => {
            dispatch(changeTabAction(id));
        },
    }),
);

type PropsReduxType = ConnectedProps<typeof connector>;
export type PropsType = PropsReduxType & IProps;

class ListTabs extends React.Component {
    props: PropsType;

    private _listTabs: HTMLDivElement;

    render(): React.ReactNode {
        return (
            <div
                className='listTabs'
                ref={(lt: HTMLDivElement): void => {
                    this._listTabs = lt;
                }}
            >
                {this.props.tabs.map((tab) => (
                    <Tab key={tab.id} tabId={tab.id} />
                ))}
            </div>
        );
    }

    componentDidMount(): void {
        this._listTabs.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            if (target.classList.contains('tab')) {
                this.props.changeActive(+target.dataset.id);
            }
        });
    }
}

export default connector(ListTabs);
