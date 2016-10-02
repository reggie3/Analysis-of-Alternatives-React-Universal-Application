//import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import secrets from '../config/secrets';


let userPool;

export function cognitoTest(){
    console.log("cognitoTest works");
} 

export function init(){
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(secrets.aws.poolData);
    
}