import validator from 'validator';
import React, {Component} from 'react';
import { Carousel, Modal, Button, FormControl,
    FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import {TwitterLogin, Facebook, Google} from './SocialLogin';
import { connect } from 'react-redux';
import actions from '../redux/actions';

export class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showLoginBol: this.props.showLoginBol,
            emailAddress: '',
            password: ''
        }
    }
    showLogin() {
        this.props.dispatchShowLogin();
    }

    closeModal() {
        this.props.dispatchHideLoginForms();
    }

    showCreateAccount() {
        this.props.dispatchShowCreateAccount();
    }

    handleInputChange(event) {
        switch (event.target.name) {
            case 'emailAddress':
                this.setState({ emailAddress: event.target.value });
                break;
            case 'password':
                this.setState({ password: event.target.value });
                break;
        }
    }

    login() {
        //this.props.fetchData();
        //this.props.dispatchLogin(this.state.emailAddress, this.state.password);
        this.props.auth.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: this.state.emailAddress,
            password: this.state.password
        }, function (err) {
            if (err) alert("something went wrong: " + err.message);
        });
    }


    facebookSignup() {

    }
    facebookResponse() { }

    render() {
        return (
            <Modal
                show={this.props.showLoginBol}
                onHide={this.closeModal}
                style={modalStyle}>
                <div id='login' ref='login'
                    style={formStyle}>
                    <h2>Login</h2>
                    <div id='socialButtonContainer' style={socialLoginButtons}>
                        <TwitterLogin/>
                        <Facebook/>
                        <Google/>
                    </div>
                    <form style={flexItem}>
                        <FormGroup controlId="formBasicText">

                            <FormControl
                                style={flexItem}
                                type="text"
                                name='emailAddress'
                                placeholder="Email Address"
                                onChange={this.handleInputChange.bind(this) }
                                value={this.state.emailAddress}
                                />
                            <FormControl
                                style={flexItem}
                                name='password'
                                type="password"
                                placeholder="Password"
                                onChange={this.handleInputChange.bind(this) }
                                value={this.state.password}
                                />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                    </form>
                    <Button
                        style={flexItem}
                        bsStyle="success"
                        onClick={this.login.bind(this) }
                        >
                        Login
                    </Button>
                    <Button
                        style={flexItem}
                        bsStyle="primary"
                        onClick={this.showCreateAccount.bind(this) }
                        >
                        Create an Account
                    </Button>
                    <Button
                        style={flexItem}
                        bsStyle="default"
                        onClick={this.closeModal.bind(this) }
                        >
                        Cancel
                    </Button>
                </div>
            </Modal>
        )
    }
}

/**
 * Create Account Component
 */
export class CreateAccount extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showCreateAccountBol: this.props.showCreateAccountBol,
            emailAddress: '1@2.com',
            password1: '123456',
            password2: '123456',
            userName: 'asd',
            val: {
                name: { msg: '', state: '' },
                email: { msg: '', state: '' },
                pass: { msg: '', state: '' },
                account: { msg: '', state: '' }
            }
        }
    }

    showLogin() {
        this.props.dispatchShowLogin();
    }

    closeModal() {
        this.props.dispatchHideLoginForms();
    }

    checkMatchingPasswords() {
        if (this.state.password1 === this.state.password2) {
            return true;
        }
        return false;
    }
    checkPasswordLength() {
        if (this.state.password1.length >= 6) {
            return true;
        }
        return false;
    }

    setFormNotification(name, state, message) {
        let newVal = Object.assign({}, this.state.val);
        newVal[name].msg = message;
        if (name !== 'account') {
            newVal[name].state = state
        }
        this.setState({ val: newVal });
    }

    createAccount() {
        let formPassedTests = true;

        // set all the form fields to success, and only change them to errors
        // if they are errors
        this.setFormNotification('name', '', '');
        this.setFormNotification('pass', 'success', '');
        this.setFormNotification('email', 'success', '');

        // check password
        if (!this.checkMatchingPasswords()) { this.setFormNotification('pass', 'error', 'Passwords must match.'); formPassedTests = false }
        if (!this.checkPasswordLength()) { this.setFormNotification('pass', 'error', 'Password must be at least 6 characters long'); formPassedTests = false }
        
        // check email address
        if (!validator.isEmail(this.state.emailAddress)) { this.setFormNotification('email', 'error', 'Not a valid email address.'); formPassedTests = false }
        
        if (formPassedTests) {
            this.props.auth.signup({
                connection: 'Username-Password-Authentication',
                responseType: 'token',
                username: this.state.userName,
                email: this.state.emailAddress,
                password: this.state.password1,
            }, function (err) {
                // if (err) alert("something went wrong: " + err.message);
                this.setFormNotification('account', 'error', err.message);
                this.setFormNotification('name', 'error', '');
            }.bind(this));
        }
    }

    handleInputChange(event) {
        switch (event.target.name) {
            case 'emailAddress':
                this.setState({ emailAddress: event.target.value });
                break;
            case 'password1':
                this.setState({ password1: event.target.value });
                break;
            case 'password2':
                this.setState({ password2: event.target.value });
                break;
            case 'userName':
                this.setState({ userName: event.target.value });
                break;
        }
    }
    render() {
        return (
            <Modal
                show={this.props.showCreateAccountBol}
                onHide={this.closeModal}
                style={modalStyle}>
                <div id='createAccount' ref='createAccount'
                    style={formStyle}>
                    <h2>Create an Account</h2>
                    <form style={flexItem}>
                        <HelpBlock>
                            {this.state.val.account.msg}
                        </HelpBlock>
                        <FormGroup controlId="formBasicText" validationState={this.state.val.name.state}>
                            <FormControl
                                style={flexItem}
                                type="text"
                                name='userName'
                                placeholder="User Name"
                                onChange={this.handleInputChange.bind(this) }
                                value={this.state.userName}
                                />
                            <HelpBlock>
                                {this.state.val.name.msg}
                            </HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="formBasicText"  validationState={this.state.val.email.state}>
                            <FormControl
                                style={flexItem}
                                type="text"
                                placeholder="Email Address"
                                onChange={this.handleInputChange.bind(this) }
                                name='emailAddress'
                                value={this.state.emailAddress}
                                />
                            <HelpBlock>
                                {this.state.val.email.msg}
                            </HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="formBasicText" validationState={this.state.val.pass.state}>
                            <FormControl
                                style={flexItem}
                                type="password"
                                placeholder="Password"
                                onChange={this.handleInputChange.bind(this) }
                                name='password1'
                                value={this.state.password1}
                                />
                            <FormControl
                                style={flexItem}
                                type="password"
                                placeholder="Confirm Password"
                                onChange={this.handleInputChange.bind(this) }
                                name='password2'
                                value={this.state.password2}
                                />
                            <HelpBlock>
                                {this.state.val.pass.msg}
                            </HelpBlock>
                        </FormGroup>
                    </form>
                    <Button
                        style={flexItem}
                        bsStyle="success"
                        onClick={this.createAccount.bind(this) }
                        >
                        Create an Account
                    </Button>
                    <Button
                        style={flexItem}
                        bsStyle="primary"
                        onClick={this.showLogin.bind(this) }
                        >
                        Login
                    </Button>
                    <Button
                        style={flexItem}
                        bsStyle="default"
                        onClick={this.closeModal.bind(this) }
                        >
                        Cancel
                    </Button>
                </div>
            </Modal>
        )
    }
}

var socialLoginButtons = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'middle',
    justifyContent: 'center'
}

var formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "stretch",
    padding: '5px 15px 5px 15px'
}

var flexItem = {
    margin: '5px 0 5px 0'
}

var modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    padding: '0px 10px 0px 10px',
}


