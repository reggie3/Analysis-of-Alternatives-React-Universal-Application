import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, Overlay} from 'react-bootstrap';

class ErrorPopup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: 'default',
            show: false
        }
    }
    show(target) {
        console.log("showing error");
        this.setState({
            show: true,
            container: this,
            target: () => ReactDOM.findDOMNode(target)
        })
    }
    hide() {
        console.log("hiding error");
        this.setState({
            show: false
        })
    }

    render() {
        const sharedProps = {
            show: this.state.show,
            container: this,
        };
        return (
            <Overlay {...sharedProps} placement="right">
                <Tooltip placement="right" className="in" id="tooltip-right">
                    Tooltip right
                </Tooltip>
            </Overlay>
        )
    }
}

export default ErrorPopup;