let cognitoActions = {
    initCognito: function(){
        return{
            type: "INIT_COGNITO"
        }
    },

    createCognitoUser: function(userName, emailAddress, password){
        return{
            type: "CREATE_COGNITO_USER",
            payload: {
                userName,
                emailAddress,
                password
            }
        }
    },

    loginCognitoUser: function(emailAddress, password){
        return{
            type: "LOGIN_COGNITO_USER",
            payload: {
                emailAddress,
                password
            }
        }
    }
}

export default cognitoActions;