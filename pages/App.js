import React, {Component} from 'react';
import NavLink from '../components/NavLink';
import Navbar from '../components/NavbarForReactRouter';

import secrets from '../config/secrets'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';

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
];

class AppComponent extends Component {
    constructor(props) {
        super(props);
    }
    // sort the list of criteria prior to displaying it for the first time
    componentWillMount() {

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
    return {state: {
        showLogin: state.modalDisplay.showLogin,
        showCreateAccount: state.modalDisplay.showCreateAccount,
        auth: state.userData.auth
    }};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({
        // actions
        sort: actions.sort,
        dispatchLogin: actions.login,

        // api calls
        dispatchCreateAccount: actions.createAccount,
       
        // show modals
        dispatchShowLogin: actions.showLogin,
        dispatchShowCreateAccount: actions.showCreateAccount,
        dispatchHideLoginForms: actions.hideLoginForms,

    }, dispatch)};
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;