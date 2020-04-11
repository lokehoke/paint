'use strict';

import React, { ReactNode } from 'react';
import { Vector2 } from '../../../structDate/vector2';

export interface IProps {
    size: Vector2;
    children: ReactNode;
}

export default class FlexiblePlace extends React.Component {
    // TODO piece of shit!!!!!!!!!
    props: IProps;

    private _inner: HTMLElement;

    render(): React.ReactNode {
        const style = {
            height: `${this.props.size.x}px`,
            width: `${this.props.size.y}px`,
            overflow: 'hidden',
        };

        return (
            <div
                style={style}
                ref={(inner: HTMLElement): void => {
                    this._inner = inner;
                }}
            >
                {this.props.children}
            </div>
        );
    }

    componentDidMount(): void {
        // console.log(this.inner.scrollWidth);
        // console.log(this.inner.scrollHeight);
    }
}
