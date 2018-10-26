'use strict';

const React = require('react');
const PropTypes = require('prop-types')

const PimpDote = require('./../simpleComponents/pimpDote.jsx');

const DragnDrop = require('./../../../commonInterface/dragonDrop/dragnDrop.js');

let sizePoint = 20;

let stylesValueSlider = {
    position: 'relative',
    display: 'flex',
    margin: '0 15px',
    flexGrow: 1,
    height: '2px',
    backgroundColor: 'black'
};

let stylePip = {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    display: 'none',
    width: `${sizePoint}px`,
    height: `${sizePoint}px`
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

    constructor(props) {
        super(props);
        this._pimp = React.createRef();
        this._deleteDnd = () => {};
    }

    render() {
        return (
            <div style={stylesValueSlider}>
                <PimpDote
                    style={stylePip}
                    ref={pimp => this._pimp = pimp}
                />
            </div>
        );
    }

    componentDidMount() {
        this._deleteDnd = this._setUpDragnDrop();
    }

    _setUpDragnDrop() {
        let dragn = new DragnDrop(this._pimp.getDom(), {
            ignoreNoDrugon: true,
            onlyX: true,
            showAfterMount: {
                isset: true,
                sizeItem: {
                    x: sizePoint,
                    y: sizePoint
                }
            },
            piece: {
                exist: true,
                min: {
                    x: this.props.min
                },
                max: {
                    x: this.props.max
                },
                step: {
                    x: this.props.changingValue
                },
                cur: {
                    x: this.props.cur
                },
                exitFromContur: true
            },
            transferDate: this._changeValue.bind(this)
        });

        return dragn.startDragonDroping();
    }

    _changeValue(e) {
        this.props.changing(e);
    }

    componentWillUnmount() {
        this._deleteDnd();
    }
}
