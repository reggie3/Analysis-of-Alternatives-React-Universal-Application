import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';

class ProfileComponent extends Component{

  constructor(props, context) {
        super(props, context);
    }

    shouldComponentUpdate(){
      if(this.props.state.profile){
        return true;
      }
      return false;
    } 
  render() {
    return (
      <div>
        <h2>{this.props.state.profile.nickname}'s Profile</h2>
        <p>Email Address : {this.props.state.profile.email}</p>
        <img source = {this.props.state.profile.picture} />
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        state: {
            profile: state.auth0.profile,
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
            logoutAuth0User: actions.logoutAuth0User,
            

            // login, create account, create account feeback modal dialog controls
            dispatchShowLogin: actions.showLogin,
            dispatchShowCreateAccount: actions.showCreateAccount,
            dispatchHideLoginForms: actions.hideLoginForms,
            dispatchShowAccountCreationFeedback: actions.showAccountCreationFeedback

        }, dispatch)
    };
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
export default Profile;