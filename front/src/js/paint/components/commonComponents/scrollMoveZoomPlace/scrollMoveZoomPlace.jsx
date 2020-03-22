'use strict';

import React from 'react';

export default class FlexiblePlace extends React.Component { // TODO piece of shit!!!!!!!!!
    render() {
        let style = {
            height: this.props.height,
            width: this.props.width,
            overflow: 'hidden',
        };

        return (
            <div style={style} ref={inner => this.inner = inner}>
                {this.props.children}
            </div>
        );
    }

    componentDidMount() {
        // console.log(this.inner.scrollWidth);
        // console.log(this.inner.scrollHeight);
    }
}