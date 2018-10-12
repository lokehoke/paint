'use strict';

const React = require('react');
const PropTypes = require('prop-types')

const PimpDote = require('./../simpleComponents/pimpDote.jsx');

let stylesValueSlider = {
    position: 'relative',
    display: 'flex',
    margin: '0 10px',
    flexGrow: 1,
    height: '2px',
    backgroundColor: 'black'
};

let stylePip = {
        position: 'absolute',
        top: '-8px'
};

module.exports = class ValueSlider extends React.Component {
    static defaultProps = {
        min: 0,
        max: 0,
        cur: 0,
        changingValue: 1,
        changing: () => {},
        config: {
            subValue: false,
            showValue: false,
            styles: {}
        }
    };

    static propTypes = {
        min: PropTypes.number,
        cur: PropTypes.number,
        max: PropTypes.number,
        changingValue: PropTypes.number,
        changing: PropTypes.func,
        config: PropTypes.object
    };

    render() {
        return (
            <div style={stylesValueSlider}>
                <PimpDote style={stylePip}/>
            </div>
        );
    }
}
