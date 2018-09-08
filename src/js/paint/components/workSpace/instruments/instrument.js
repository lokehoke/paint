'use strict';

const React = require('react');
const FontAwesomeIcon = require('@fortawesome/react-fontawesome').FontAwesomeIcon;
const faPaintBrush = require('@fortawesome/free-solid-svg-icons').faPaintBrush;

class Instrument extends React.Component {
    render() {
        let icon = null;

        switch (this.props.type) {
            case 'brush':
                icon = (<FontAwesomeIcon icon={faPaintBrush} color="white" />);
                break;
        }

        return (
            <div className="instrument">
                {icon}
            </div>
        );
    }
}

module.exports = Instrument;
