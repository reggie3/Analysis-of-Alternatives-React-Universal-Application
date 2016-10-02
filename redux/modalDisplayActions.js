let modalDisplayActions = {
    showLogin(){
        return{
            type: 'SHOW_LOGIN'
        }
    },
    showCreateAccount(){
        return{
            type: 'SHOW_CREATE_ACCOUNT'
        }
    },
    hideLoginForms(){
        return{
            type: 'HIDE_LOGIN_FORMS'
        }
    },
    showAccountCreationFeedback(){
        return{
            type: 'SHOW_ACCOUNT_CREATION_FEEDBACK'
        }
    }
}

export default modalDisplayActions;