import React, {Component} from 'react';
import NavLink from '../components/NavLink';
import Navbar from '../components/NavbarForReactRouter';

import secrets from '../config/secrets'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';
import { AWSCognito, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

let links = [
    {
        name: "Analysis of Alternatives",
        url: "/",
        isHome: true,
        type: "link",
        requireAuth: false
    },
    {
        name: "About",
        url: "/about",
        type: "link",
        requireAuth: false
    },
    {
        name: "Analysis",
        url: "/analysis",
        type: "link",
        requireAuth: false
    },
    {
        name: "Profile",
        url: "/profile",
        type: "link",
        requireAuth: true
    },
    {
        label: "Login",
        type: "button"
    },
    {
        label: "Logout",
        type: "button"
    },
];

class AppComponent extends Component {
    constructor(props) {
        super(props);
    }
    // sort the list of criteria prior to displaying it for the first time
    componentWillMount() {
        this.props.actions.initAuth0();
        //this.props.actions.initCognito();
    
    }

    render() {
        return (
            <div>
                <Navbar
                    links = {links}
                    actions = {this.props.actions}
                    state = {this.props.state}
                    />
                <div style={content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

var content = {
    // provide some left and right side padding
    padding: '1vh 5% 0% 5%'
}

function mapStateToProps(state) {
    return {
        state: {
            showLogin: state.modalDisplay.showLogin,
            showCreateAccount: state.modalDisplay.showCreateAccount,
            showAccountCreationFeedback: state.modalDisplay.showAccountCreationFeedback,
            auth: state.userData.auth,
            auth0: state.auth0,
            cognito: state.cognito,
            currentUrl: state.routing.locationBeforeTransitions.pathname,
            loggedIn: state.auth0.loggedIn
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            // actions
            sort: actions.sort,

            // api calls
            dispatchLogin: actions.login,
            dispatchCreateAccount: actions.createAccount,
            initCognito: actions.initCognito,
            createCognitoUser: actions.createCognitoUser,
            loginCognitoUser: actions.loginCognitoUser,

            // auth0
            // the following are not required when using the Auth0 sdk
            // loginAuth0User: actions.loginAuth0User,
            // createAuth0User: actions.createAuth0User,
            
            // initialize auth0 prior to making a call
            initAuth0: actions.initAuth0,
            // save the user profile to the store after we login or create a user
            saveAuth0Profile: actions.saveAuth0Profile,
            saveAuth0TokenData: actions.saveAuth0TokenData, 
            logoutAuth0User: actions.logoutAuth0User,
            

            // login, create account, create account feeback modal dialog controls
            dispatchShowLogin: actions.showLogin,
            dispatchShowCreateAccount: actions.showCreateAccount,
            dispatchHideLoginForms: actions.hideLoginForms,
            dispatchShowAccountCreationFeedback: actions.showAccountCreationFeedback

        }, dispatch)
    };
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;