import validator from 'validator';
import React, {Component} from 'react';
import { Modal, Button, FormControl,
    FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import {TwitterLogin, Facebook, Google} from './SocialLogin';
import { connect } from 'react-redux';
import actions from '../redux/actions';
//import * as cognitoHelper from '../utilities/cognitoHelper';


export class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showLoginBol: this.props.showLoginBol,
            emailAddress: '947172@22.com',
            password: '123456',
            val: {
                email: { msg: '', state: '' },
                pass: { msg: '', state: '' },
            }
        }
    }
    showLogin() {
        this.props.dispatchShowLogin();
        cognitoHelper.cognitoTest();
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

    setFormNotification(name, state, message) {
        let newVal = Object.assign({}, this.state.val);
        newVal[name].msg = message;
        if (name !== 'account') {
            newVal[name].state = state;
        }
        this.setState({ val: newVal });
    }

    login() {
        let formPassedTests = true;

        // set all the form fields to success, and only change them to errors
        // if they are errors
        this.setFormNotification('pass', 'success', '');
        this.setFormNotification('email', 'success', '');

        // make sure something is in the password field
        if (this.state.password.length === 0) {
            this.setFormNotification('pass', 'error', 'Password cannot be blank.'); formPassedTests = false;
        }
        // check email address
        if (!validator.isEmail(this.state.emailAddress)) { this.setFormNotification('email', 'error', 'Not a valid email address.'); formPassedTests = false }
        if (formPassedTests) {
            this.props.initAuth0(this.props.currentUrl);

            this.props.auth.login({
                connection: 'Username-Password-Authentication',
                email: this.state.emailAddress,
                password: this.state.password,
                redirect: false,
                sso: false,
            }, function (err, result) {
                if (err) {
                    alert("something went wrong: " + err.message);
                    this.closeModal().bind(this);
                    return;
                }
                this.props.dispatchHideLoginForms();
                this.props.saveAuth0TokenData(result);
                this.props.auth0.auth0.getProfile(result.idToken, function (err, profile) {
                    if(err){
                        this.closeModal().bind(this);
                        return;
                    }
                    this.props.saveAuth0Profile(profile);
                }.bind(this));
            }.bind(this));
        }
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
                        <FormGroup controlId="formBasicText"
                            validationState={this.state.val.email.state}>

                            <FormControl
                                style={flexItem}
                                type="text"
                                name='emailAddress'
                                placeholder="Email Address"
                                onChange={this.handleInputChange.bind(this) }
                                value={this.state.emailAddress}
                                />
                            <HelpBlock>
                                {this.state.val.email.msg}
                            </HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="formBasicText"
                            validationState={this.state.val.pass.state}>
                            <FormControl
                                style={flexItem}
                                name='password'
                                type="password"
                                placeholder="Password"
                                onChange={this.handleInputChange.bind(this) }
                                value={this.state.password}
                                />
                            <HelpBlock>
                                {this.state.val.pass.msg}
                            </HelpBlock>
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
        let random = Math.floor(Math.random() * 1000000);
        this.state = {
            showCreateAccountBol: this.props.showCreateAccountBol,
            emailAddress: random + '@eil.com',
            userName: random + "", //needs to be a string
            password1: '123456',
            password2: '123456',

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
        cognitoHelper.cognitoTest();
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
            newVal[name].state = state;
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
            //this.props.dispatchCreateAccount(this.state.emailAddress, this.state.password1);
            //this.props.createCognitoUser(this.state.userName, this.state.emailAddress, this.state.password1);

            // update the current URL so that we come back to this same page after creating the account
            this.props.initAuth0(this.props.currentUrl);

            this.props.auth0.auth0.signup({
                connection: 'Username-Password-Authentication',
                username: this.state.userName,
                email: this.state.emailAddress,
                //popup: true,
                sso: false,
                //redirect: false,
                rememberLastLogin: false,
                password: this.state.password1
            }, function (err, result) {
                if (err) {
                    if(err.message.toLowerCase().indexOf('username')!==-1){
                        this.setFormNotification('name', 'error', err.message);
                    }
                    else if(err.message.toLowerCase().indexOf('email')!==-1){
                         this.setFormNotification('email', 'error', err.message);
                    }
                    else{
                        this.setFormNotification('account', 'error', err.message);
                        this.setFormNotification('email', 'error', "Email address already in use.");
                    }
                    
                    console.log(err.message);
                    return;
                }
                this.props.saveAuth0TokenData(tokenData);
                this.props.auth0.auth0.getProfile(result.idToken, function (err, profile) {
                    if(err){
                        this.closeModal().bind(this);
                        return;
                    }
                    // alert('hello ' + profile.name);
                    this.props.dispatchHideLoginForms();
                    this.props.saveAuth0Profile(profile);
                    this.props.dispatchShowAccountCreationFeedback();
                }.bind(this));
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
                        <FormGroup controlId="formBasicText"
                            alidationState={this.state.val.name.state}>
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


