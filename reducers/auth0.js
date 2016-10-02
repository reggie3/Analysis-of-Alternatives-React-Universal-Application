//import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import secrets from '../config/secrets';
// import AWSCognito from '../vendor/aws-cognito-sdk';
import Auth0 from 'auth0-js';


export default function cognito(auth0 = {}, action) {
    let updatedAuth0 = {};
    switch (action.type) {
        case "INIT_AUTH0":
            let url = 'http://localhost:8080';
            //if(action.payload.currentUrl){
            //    url = action.payload.currentUrl
            //}
            updatedAuth0.auth0 = new Auth0({
                domain: 'reggie3.auth0.com',
                clientID: '4R53x9Kq8dzr55RrwouokMOO25aXxxzd',
                // callbackURL: url,
                // popup: true,
                // sso: false,
                responseType: 'token'
            });
            console.log("Initiailizing Auth0");
            return Object.assign({}, cognito, updatedAuth0);

        case "CREATE_AUTH0_USER":
            updatedAuth0.auth0 = new Auth0({
                domain: 'reggie3.auth0.com',
                clientID: '4R53x9Kq8dzr55RrwouokMOO25aXxxzd',
                callbackURL: action.payload.currentUrl,
                responseType: 'token'
            });
            console.log("Initiailizing Auth0 ");
            return Object.assign({}, cognito, updatedAuth0);

        case "LOGIN_AUTH0_USER":
            console.log("loging out auth 0");
            return updatedAuth0;

        case "LOGOUT_AUTH0_USER":
            updatedAuth0.tokenData = {};
            updatedAuth0.profile = {};
            var transitionTo = Router.transitionTo;
            transitionTo('your_route_name', query={keyword: input_value});

            return Object.assign({}, auth0, updatedAuth0, {loggedIn: false});

        case "SAVE_AUTH0_PROFILE":
            updatedAuth0.profile = action.payload.profile;
            return Object.assign({}, auth0, updatedAuth0, {loggedIn: true});

        case "SAVE_AUTH0_TOKEN_DATA":
            updatedAuth0.tokenData = action.payload.tokenData;
            return Object.assign({}, auth0, updatedAuth0, {loggedIn: true});
        default:
            return auth0;
    }
}
