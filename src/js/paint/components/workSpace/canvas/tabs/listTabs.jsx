'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tab from './tab.jsx';

class ListTabs extends React.Component {
    static defaultProps = {
        activeTab: 0,
        tabs: [],
    };

    static propTypes = {
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
    };

    componentWillUpdate() {
        if(this.props.tabs[0] && !this.props.tabs.some(tab => tab.id === this.props.active)) {
            this.props.changeActive(this.props.tabs[this.props.tabs.length-1].id);
        }
    }

    render() {
        return (
            <div className="listTabs" ref={lt => this.listTabs = lt}>
                {this.props.tabs.map(tab => (
                    <Tab key={tab.id} tabId={tab.id} />
                ))}
            </div>
        );
    }

    componentDidMount() {
        this.listTabs.addEventListener('click', e => {
            if(e.target.classList.contains('tab')) {
                this.props.changeActive(e.target.dataset.id);
            }
        });
    }
}

export default connect(
    state => ({
        tabs: state.tabs.own,
        active: state.tabs.activeTab
    }),
    dispatch =>({
        changeActive: id => {
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                activeTab: id
            });
        }
    })
)(ListTabs);
