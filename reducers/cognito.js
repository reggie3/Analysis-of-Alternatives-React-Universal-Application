//import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import secrets from '../config/secrets';
// import AWSCognito from '../vendor/aws-cognito-sdk';
import AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AWSCognito from 'amazon-cognito-identity-js';

export default function cognito(cognito = {}, action) {
    let updatedCognito = {};
    switch (action.type) {
        case "INIT_COGNITO":
            var poolData = {
                UserPoolId: secrets.aws.poolData.poolId,
                ClientId: secrets.aws.poolData.clientId
            };
            updatedCognito.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

            return Object.assign({}, cognito, updatedCognito);

        case "CREATE_COGNITO_USER":
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2_1wsGKOaqo',
                /*Logins: { // optional tokens, used for authenticated login
                    'graph.facebook.com': 'FBTOKEN',
                    'www.amazon.com': 'AMAZONTOKEN',
                    'accounts.google.com': 'GOOGLETOKEN'
                }*/
            });
            let params = {
                ClientId: '4tis1j52nd4j0bsnm65lobddee', /* required */
                Password: actions.payload.password, /* required */
                Username: actions.payload.userName, /* required */
                //SecretHash: 'STRING_VALUE',
                UserAttributes: [
                    {
                        Name: 'EmailAddress', /* required */
                        Value: actions.payload.emailAddress
                    },
                    {
                        Name: 'UserName', /* required */
                        Value: actions.payload.userName
                    },
                    /* more items */
                ],
                /*ValidationData: [
                    {
                        Name: 'STRING_VALUE', 
                        Value: 'STRING_VALUE'
                    },

                ]*/
            };
            cognitoidentityserviceprovider.signUp(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data);           // successful response
            });
            return updatedCognito;
        case "LOGIN_COGNITO_USER":
            return updatedCognito;
        default:
            return cognito;
    }
}
