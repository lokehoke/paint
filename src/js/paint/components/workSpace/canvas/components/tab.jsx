'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome').FontAwesomeIcon;
const faTimesCircle = require('@fortawesome/free-solid-svg-icons').faTimesCircle;


class Tab extends React.Component {
    static defaultProps = {
        tabId: 0,
        active: 0
    }

    static propTypes = {
        tabId: PropTypes.number,
        active: PropTypes.number
    }

    render() {
        return (
            <div className="tab">
                {`${this.props.tab.title} ${this.props.tab.size.x} : ${this.props.tab.size.y}`}
                <div className="__exitIcon" ref={exit => this.exitBtn = exit}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.exitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.props.closeTab(this.props.tab.id);

            if (+this.props.tab.id === +this.props.active) {
                this.props.changeActive(this.props.tab.id - 1);
            }

            return false;
        });
    }
}

module.exports = ReactRedux.connect(
    (state, props) => ({
        tab: state.tabs.find(el => +el.id === +props.tabId),
        active: state.activeTab
    }),
    dispatch => ({
        closeTab: id => {
            dispatch({
                type: 'CLOSE_TAB',
                id
            });
        },
        changeActive: id => {
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                activeTab: id
            })
        }
    })
)(Tab);
