'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');

const Tab = require('./tab.jsx');

class ListTabs extends React.Component {
    static defaultProps = {
        tabs: [],
        activeTab: 0
    };

    static propTypes = {
        tabs: PropTypes.array,
        activeTab: PropTypes.number
    };

    render() {
        return (
            <div className="listTabs">
                {this.props.tabs.map(tab => (
                    <Tab key={tab.id} tabId={tab.id}/>
                ))}
            </div>
        );
    }
}

module.exports = ReactRedux.connect(state => ({
    tabs: state.tabs,
    active: state.activeTab
}))(ListTabs);
