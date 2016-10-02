import React, {Component} from 'react';
import { Modal, Button, FormControl,
    FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class AccountCreationFeedback extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            emailAddress: this.props.auth0.profile.email,
            userName: this.props.auth0.profile.nickname
        }

    }

    closeModal() {
        this.props.dispatchShowAccountCreationFeedback();
    }

    shouldComponentUpdate() {
        // only bother to do this if we have a profile from auth0
        if ((this.props.auth0.hasOwnProperty('profile'))&&
            (this.props.showAccountCreationFeedback)) {
            return true;
        }
        return false;
    }

    render() {
        let dialog = "";

        if (this.props.auth0.verifyAccounts) {
            dialog = <Modal
                show={this.props.showAccountCreationFeedback}
                onHide={this.closeModal}
                style={modalStyle}>
                <h2>Welcome {this.props.auth0.profile.nickname}</h2>
                <p>A verification email has been sent to {this.props.auth0.profile.email}.
                    Please respond to it in order to verify your account</p>
                <Button
                    style={flexItem}
                    bsStyle="default"
                    onClick={this.closeModal.bind(this) }
                    >
                    Close
                </Button>
            </Modal>
        }
        else {
            dialog = <Modal
                show={this.props.showAccountCreationFeedback}
                onHide={this.closeModal}
                style={modalStyle}>
                <div style={formStyle}>
                    <h2>Welcome {this.props.auth0.profile.nickname}</h2>
                    <p style={flexItem}>Thank your for signing up.  Your account has been created.</p>
                    <Button
                        style={flexItem}
                        bsStyle="primary"
                        onClick={this.closeModal.bind(this) }
                        >
                        Close
                    </Button>
                </div>
            </Modal>
        }


        return (
            <div>
                { dialog }
            </div>
        )
    }
}

var modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    padding: '0px 10px 0px 10px',
}

var flexItem = {
    margin: '5px 0 5px 0'
}

var formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "stretch",
    padding: '5px 15px 5px 15px'
}