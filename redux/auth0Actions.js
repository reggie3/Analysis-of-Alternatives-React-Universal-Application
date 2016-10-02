let auth0Actions = {
    initAuth0: function (currentUrl) {
        return {
            type: "INIT_AUTH0",
            payload: {
                currentUrl,
            }
        }
    },

    createAuth0User: function (userName, emailAddress, password) {
        return {
            type: "CREATE_AUTH0_USER",
            payload: {
                userName,
                emailAddress,
                password
            }
        }
    },

    loginAuth0User: function (emailAddress, password) {
        return {
            type: "LOGIN_AUTH0_USER",
            payload: {
                emailAddress,
                password
            }
        }
    },
    logoutAuth0User: function () {
        return {
            type: "LOGOUT_AUTH0_USER",
        }
    },
    saveAuth0Profile: function (profile) {
        return {
            type: "SAVE_AUTH0_PROFILE",
            payload: {
                profile
            }
        }
    },
    saveAuth0TokenData: function (tokenData) {
        return {
            type: "SAVE_AUTH0_TOKEN_DATA",
            payload: {
                tokenData
            }
        }
    }
}

export default auth0Actions;