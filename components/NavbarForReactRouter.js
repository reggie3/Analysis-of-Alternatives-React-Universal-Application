import React, {Component} from 'react';
import { Link, IndexLink  } from 'react-router';
import {Button} from 'react-bootstrap';
import AccountAuthentication from './AccountAuthentication';
import {Login, CreateAccount} from './AuthenticationForms';


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
            onClick = {this.props.onClick}>
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
            showCreateAccount: false
        }
    }

    navLink(link) {
        return "link";
    }
    /*
    showLogin() {
        if(this.Login){
            this.Login.openModal();
        }
        if(this.CreateAccount){
            this.CreateAccount.closeModal();
        }
    }

    showCreateAccount() {
        if(this.CreateAccount){
            this.CreateAccount.openModal();
        }
        if(this.Login){
            this.Login.closeModal();
        }
    }*/
    checkAuth(){
        console.log("checkAuth");
    }
    showLogin(){
        this.props.actions.dispatchShowLogin();
    }

    render() {
        return <div className = "navbarForReactRouter" style={barStyle}>
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
                            else if(link.requireAuth)
                                return <IndexNavbarLink
                                    style = {Object.assign({}, normalLink) }
                                    key = {index}
                                    to = {link.url}
                                    onClick = {this.checkAuth}>
                                    {link.name}
                                </IndexNavbarLink>
                            else
                                return <NavbarLink
                                    style = {normalLink}
                                    key = {index}
                                    to = {link.url}>
                                    {link.name}
                                </NavbarLink>

                        case "button":
                            return <NavbarButton
                                label = {link.label}
                                key = {index}
                                onClick = {this.showLogin.bind(this)}>
                            </NavbarButton>
                    }
                })
            }

            <Login 
                ref={(c) => this.Login = c}
                showLoginBol = {this.props.state.showLogin}
                auth = {this.props.state.auth}
                dispatchLogin = {this.props.actions.dispatchLogin}
                dispatchShowLogin = {this.props.actions.dispatchShowLogin}
                dispatchShowCreateAccount = {this.props.actions.dispatchShowCreateAccount}
                dispatchHideLoginForms = {this.props.actions.dispatchHideLoginForms}
                />
            <CreateAccount 
                ref={(c) => this.CreateAccount = c}
                showCreateAccountBol = {this.props.state.showCreateAccount}
                auth = {this.props.state.auth}
                dispatchCreateAccount = {this.props.actions.dispatchCreateAccount}
                dispatchShowLogin = {this.props.actions.dispatchShowLogin}
                dispatchShowCreateAccount = {this.props.actions.dispatchShowCreateAccount}
                dispatchHideLoginForms = {this.props.actions.dispatchHideLoginForms}
                />
        </div>
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
    fontSize: '1.5em'
};

var homeLink = {
    fontSize: '1.85em'
};



