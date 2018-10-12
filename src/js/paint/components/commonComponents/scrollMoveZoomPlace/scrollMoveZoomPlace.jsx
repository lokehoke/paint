'use strict';

const React = require('react');

module.exports = class FlexiblePlace extends React.Component {
    render() {
        let style = {
            height: this.props.height,
            width: this.props.width,
            overflow: 'hidden'
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
