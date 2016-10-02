import React, {Component} from 'react';
import { Link, IndexLink  } from 'react-router';
import {Button} from 'react-bootstrap';
// import AccountAuthentication from './AccountAuthentication';
import {Login, CreateAccount} from './AuthenticationForms';
import AccountCreationFeedback from './modals/AccountCreationFeedback';
import ToggleDisplay from 'react-toggle-display';



let IndexNavbarLink = React.createClass({
    render() {
        return <IndexLink {...this.props} activeStyle={{ color: '#337Ab7' }}/>
    }
})
let NavbarLink = React.createClass({
    render() {
        return <Link {...this.props} activeStyle={{ color: '#337Ab7' }}/>
    }
})
let NavbarButton = React.createClass({
    render() {
        return <Button
            bsStyle="info"
            onClick = {this.props.onClick}
            style = {this.props.style}>
            {
                this.props.label
            }
        </Button>
    }
})

/**
 * creates a navbar that use react router routes
 *  */
export default class NavbarForReactRouterComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showLogin: false,
            showCreateAccount: false,
        }
    }

    navLink(link) {
        return "link";
    }

    checkAuth() {
        console.log("checkAuth");
    }
    // show the login dialog
    showLogin() {
        this.props.actions.dispatchShowLogin();
        // this.props.actions.dispatchShowCreateAccount();
    }

    // log the user out
    logout() {
        this.props.actions.logoutAuth0User();
    }

    render() {
        // display a login button if no profile has been saved to the state yet.  Otherwise
        // display a logout button
        let loginOrLogoutButton;
        if (this.props.state.auth0.loggedIn) {
            loginOrLogoutButton = <NavbarButton
                label = "Logout"
                onClick = {this.logout.bind(this) }
                style = {rightJustify}/>
        }
        else {
            loginOrLogoutButton = <NavbarButton
                label = "Login"
                onClick = {this.showLogin.bind(this) }
                style = {rightJustify}/>
        }



        return (
            <div className = "navbarForReactRouter" style={barStyle}>
                {
                    this.props.links.map((link, index) => {
                        switch (link.type) {
                            case "link":
                                if (link.isHome)
                                    return <IndexNavbarLink
                                        style = {Object.assign({}, normalLink, homeLink) }
                                        key = {index}
                                        to = {link.url}>
                                        {link.name}
                                    </IndexNavbarLink>
                                else if (link.requireAuth)
                                    return <ToggleDisplay
                                        key = {index}
                                        hide = {!this.props.state.loggedIn}>
                                        <NavbarLink
                                            style = {Object.assign({}, normalLink) }
                                            key = {index}
                                            to = {link.url}
                                            onClick = {this.checkAuth}>
                                            {link.name}
                                        </NavbarLink>
                                    </ToggleDisplay>
                                else
                                    return <NavbarLink
                                        style = {normalLink}
                                        key = {index}
                                        to = {link.url}>
                                        {link.name}
                                    </NavbarLink>
                        }
                    }) }

                {loginOrLogoutButton}

                }

                <Login
                    showLoginBol = {this.props.state.showLogin}
                    auth = {this.props.state.auth}
                    auth0 = {this.props.state.auth0}
                    dispatchLogin = {this.props.actions.dispatchLogin}
                    dispatchShowLogin = {this.props.actions.dispatchShowLogin}
                    dispatchShowCreateAccount = {this.props.actions.dispatchShowCreateAccount}
                    dispatchHideLoginForms = {this.props.actions.dispatchHideLoginForms}
                    dispatchLogin = {this.props.actions.dispatchLogin}
                    loginCognitoUser = {this.props.actions.loginCognitoUser}
                    initAuth0 = {this.props.actions.initAuth0}
                    currentUrl = {this.props.state.currentUrl}
                    saveAuth0Profile = {this.props.actions.saveAuth0Profile}
                    saveAuth0TokenData = {this.props.actions.saveAuth0TokenData}
                    />

                <CreateAccount
                    showCreateAccountBol = {this.props.state.showCreateAccount}
                    auth = {this.props.state.auth}
                    auth0 = {this.props.state.auth0}
                    dispatchCreateAccount = {this.props.actions.dispatchCreateAccount}
                    dispatchShowLogin = {this.props.actions.dispatchShowLogin}
                    dispatchShowCreateAccount = {this.props.actions.dispatchShowCreateAccount}
                    dispatchHideLoginForms = {this.props.actions.dispatchHideLoginForms}
                    dispatchShowAccountCreationFeedback = {this.props.actions.dispatchShowAccountCreationFeedback}
                    dispatchCreateUser = {this.props.actions.dispatchCreateUser}
                    createCognitoUser = {this.props.actions.createCognitoUser}
                    initAuth0 = {this.props.actions.initAuth0}
                    saveAuth0Profile = {this.props.actions.saveAuth0Profile}
                    currentUrl = {this.props.state.currentUrl}
                    saveAuth0TokenData = {this.props.actions.saveAuth0TokenData}
                    />

                <AccountCreationFeedback
                    auth0 = {this.props.state.auth0}
                    showAccountCreationFeedback = {this.props.state.showAccountCreationFeedback}
                    dispatchShowAccountCreationFeedback = {this.props.actions.dispatchShowAccountCreationFeedback}
                    />
            </div>
        )
    }
}


/*  styling for the links is inside the master.scss stylesheet*/
var barStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    padding: '1vh 5vw 1vh 5vw',
    backgroundColor: '#101010',
};

var normalLink = {
    textDecoration: 'none',
    fontSize: '1.5em',
    padding: "0px 10px 0px 10px"
};

var homeLink = {
    fontSize: '1.85em',
    paddingRight: "5px",
    color: '#337Ab7'
};


var rightJustify = {
    marginLeft: "auto"
}
