'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');


class Tab extends React.Component {
    static defaultProps = {
        tabId: 0
    }

    static propTypes = {
        tabId: PropTypes.number
    }

    render() {
        <div className="tab">
            {tab.title} {tab.size.x}:{tab.size.y}
        </div>
    }
}

module.exports = ReactRedux.connect((state, props) => ({
    tab: state.tabs.find(el => +el.id === +props.active)
}))(Tab);
