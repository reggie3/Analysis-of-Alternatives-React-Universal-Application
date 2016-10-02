export default function modalDisplay(modalDisplay = {}, action) {
    let updatedModalDisplay = {};

    switch (action.type) {
        case "SHOW_LOGIN":

            let showLogin = !modalDisplay.showLogin;
            updatedModalDisplay = Object.assign({}, modalDisplay, { showLogin: showLogin });
            if(showLogin){
                updatedModalDisplay = Object.assign({}, updatedModalDisplay, { showCreateAccount: false });
            }
            
            return updatedModalDisplay;

        case "SHOW_CREATE_ACCOUNT":
            let showCreateAccount = !modalDisplay.showCreateAccount;
            updatedModalDisplay = Object.assign({}, modalDisplay, { showCreateAccount: showCreateAccount });
            if(showCreateAccount){
                updatedModalDisplay = Object.assign({}, updatedModalDisplay, { showLogin: false });
            }
            return updatedModalDisplay;

        case "HIDE_LOGIN_FORMS":
            updatedModalDisplay = Object.assign({}, modalDisplay, { showLogin: false },
                { showCreateAccount: false });
            return updatedModalDisplay;
        case "SHOW_ACCOUNT_CREATION_FEEDBACK":
            let showAccountCreationFeedback = !modalDisplay.showAccountCreationFeedback;
            updatedModalDisplay = Object.assign({}, modalDisplay, { showAccountCreationFeedback: showAccountCreationFeedback });
            return updatedModalDisplay;
        default:
            return modalDisplay;
    }
}