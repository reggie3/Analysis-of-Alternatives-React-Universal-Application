import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Carousel, Modal, Button, Table, FormControl,
    FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';


class AccountAuthentication extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showState: 'login'
        }
    }

    closeModal() {
        this.setState({ showModal: false });
    }
    createAccount() {
        console.log("createAccount ");
    }

    login() {
        console.log("login");
    }
    showCreateAccount() {
        this.setState({ showState: 'createAccount' });
    }
    showLogin() {
        this.setState({ showState: 'login' });
    }

    handleSelect(selectedIndex, e) {
        alert('selected=' + selectedIndex + ', direction=' + e.direction);
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    openModal(id, dispatch) {
        //console.log("show modal id : " + id);
        this.setState({
            showModal: true,
            dispatch: dispatch
        });
    }

    render() {
        var partial;
        if (this.state.showState === 'login') {
            partial = <div id='login' ref='login' className='loginSubForm'
                style={formStyle}>
                <h2>Login</h2>
                <form
                    style={flexItem}>

                    <FormGroup controlId="formBasicText">
                        <FormControl
                            style={flexItem}
                            type="text"
                            placeholder="Email Address"
                            onChange={this.handleSignupEmailAddressChange}
                            />
                        <FormControl
                            style={flexItem}
                            type="password"
                            placeholder="Password"
                            onChange={this.handleSignupPasswordChange}
                            />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </form>
                <Button
                    style={flexItem}
                    bsStyle="success"
                    onClick={this.login.bind(this) }>
                    Login
                </Button>
                <Button
                    style={flexItem}
                    bsStyle="primary"
                    onClick={this.showCreateAccount.bind(this) }>
                    Sign Up For an Account
                </Button>
            </div>;
        } else {
            partial = <div id='createAccount' ref='createAccount' className='loginSubForm'
                style={formStyle}>
                <h2>Create an Account</h2>
                <form style={flexItem}>
                    <FormGroup
                        controlId="formBasicText"
                        >
                        <FormControl
                            style={flexItem}
                            type="text"
                            placeholder="Email Address"
                            onChange={this.handleSignupEmailAddressChange}
                            />
                        <FormControl
                            style={flexItem}
                            type="password"
                            placeholder="Password"
                            onChange={this.handleSignupPasswordChange}
                            />
                        <FormControl
                            style={flexItem}
                            type="password"
                            placeholder="Verify Password"
                            onChange={this.handleSignupPasswordChange}
                            />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </form>
                <Button
                    style={flexItem}
                    bsStyle="success"
                    onClick={this.createAccount.bind(this) }>
                    Create an Account</Button>
                <Button
                    style={flexItem}
                    bsStyle="primary"
                    onClick={this.showLogin.bind(this) }>
                    Already a User?
                </Button>
            </div>;
        }
        return (
            <div>
                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    style={modalStyle}>
                    <div style={container}>
                        {partial}
                        <Button
                            style={flexItem}
                            bsStyle="default"
                            onClick={this.closeModal }>
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

let selectedForm;

export default AccountAuthentication;

var modalStyle = {
    display: 'flex',
    justifyContent: 'middle',
    alignItems: "center",
    padding: '0px 10px 0px 10px',
}

var container = {
    backgroundColor: "Gainsboro",
    padding: "10px 10px 10px 10px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'middle',
    alignItems: "stretch",
}

var formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'middle',
    alignItems: "stretch",
}



var flexItem = {
    margin: '5px 0 5px 0'
}

var hide = {
    display: 'none'
}

var show = {
    display: 'block'
}

