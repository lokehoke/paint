'use strict';

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import FlexiblePlace from '../../commonComponents/scrollMoveZoomPlace/scrollMoveZoomPlace';
import { Vector2 } from '../../../structDate/vector2';
import { InfoTab } from '../../../structDate/infoTab';
import { IModeContext } from '../../../reducers/ownReducers/instruments';
import { CtxWrapper } from '../../../ctx/ctxWrapper';

interface IRootState {
    sizeScreen: Vector2,
    tabs: {
        own: Array<InfoTab>,
        activeTab: number,
    },
    instruments: IModeContext,
};

let connector = connect(
    (state: IRootState) => ({ // TODO magic digits
        size: {
            height: state.sizeScreen.x - 85,
            width: state.sizeScreen.y - 45
        },
        tabs: state.tabs.own,
        activeTab: state.tabs.activeTab,
        instrumentary: state.instruments,
    })
);

type PropsReduxType = ConnectedProps<typeof connector>
export type PropsType = PropsReduxType;

class Tabs extends React.Component {
    props: PropsType;

    private _canvMap: Map<number, CtxWrapper> = new Map();

    render() {
        let tabs = this.props.tabs.map((el: InfoTab, i: number) => {
            return (<canvas
                key={el.id}
                ref={(canv: HTMLCanvasElement) => {
                        if (canv && !this._canvMap.has(el.id)) {
                            this._canvMap.set(el.id, new CtxWrapper(canv, this.props.instrumentary))
                        }
                    }
                }
                className={(el.id === this.props.activeTab ? 'active' : '')}
                height={el.size.x}
                width={el.size.y}
            />);
        });
        return (
            <FlexiblePlace size={new Vector2(this.props.size.height, this.props.size.width)}>
                {tabs}
            </FlexiblePlace>
        );
    }

    componentDidUpdate() {
        for (let [key, value] of this._canvMap) {
            if (this.props.tabs.some((el: InfoTab)=> el.id == key)) {
                if (!value.isActive()) {
                    value.activeCtxWrapper();
                }
                value.updateModeContext(this.props.instrumentary);
            } else {
                value.deactivateCtxWrapper();
                this._canvMap.delete(key);
            }
        }
    }
}

export default connector(Tabs);