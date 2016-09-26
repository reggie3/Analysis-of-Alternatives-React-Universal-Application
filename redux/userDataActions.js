import axios from 'axios';
import secrets from '../config/secrets';

import { CALL_API } from 'redux-api-middleware';

let userDataActions = {
    /*
    fetchData: function () {
        return (dispatch) => {
            dispatch({ type: 'FETCH_USERS_START' });
            axios.get('http://rest.learncode.academy/api/learncode/friends')
                .then((response) => {
                    dispatch({ type: 'RECEIVE_USERS', payload: response.data })
                })
                .catch((err) => {
                    dispatch({ type: 'FETCH_USERS_ERROR', payload: err })
                });
        }
    },

    login: function () {
        return (dispatch) => fetch(secrets.server.url)
            .then(res => res.json())
            .then(json => dispatch({
                type: 'LOGIN',
                data: json
            }));
    },

    createAccount: function () {
        return (dispatch) => fetch(secrets.server.url)
            .then(res => res.json())
            .then(json => dispatch({
                type: 'CREATE_ACCOUNT',
                data: json
            }));
    }*/
    fetchData() {
        return {
            [CALL_API]: {
                endpoint: 'http://rest.learncode.academy/api/learncode/friends',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${api.token}`
                },
                types: [
                    {
                        type: 'REQUEST',
                        payload: (action) => {
                            return {
                                endpoint: action[CALL_API].endpoint
                            };
                        }
                    },
                    {
                        type: 'LOGIN_SUCCESS',  
                    },
                    {
                        type: 'LOGIN_FAILURE',  
                    }
                ],
            }
        }
    },
    login(emailAddress, password) {
        return {
            [CALL_API]: {
                endpoint: 'http://rest.learncode.academy/api/learncode/friends',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${api.token}`
                },
                types: [
                    {
                        type: 'REQUEST',
                        payload: (action) => {
                            return {
                                endpoint: action[CALL_API].endpoint
                            };
                        }
                    },
                    {
                        type: 'LOGIN_SUCCESS',  
                    },
                    {
                        type: 'LOGIN_FAILURE',  
                    }
                ],
            }
        }
    },
    loginGoogle() {
        return {
            [CALL_API]: {
                endpoint: 'http://rest.learncode.academy/api/learncode/friends',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${api.token}`
                },
                types: [
                    {
                        type: 'REQUEST',
                        payload: (action) => {
                            return {
                                endpoint: action[CALL_API].endpoint
                            };
                        }
                    },
                    {
                        type: 'LOGIN_SUCCESS',  
                    },
                    {
                        type: 'LOGIN_FAILURE',  
                    }
                ],
            }
        }
    },
    loginTwitter: function () {
        return {
            [CALL_API]: {
                endpoint: 'http://rest.learncode.academy/api/learncode/friends',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${api.token}`
                },
                types: [
                    {
                        type: 'REQUEST',
                        payload: (action) => {
                            return {
                                endpoint: action[CALL_API].endpoint
                            };
                        }
                    },
                    {
                        type: 'LOGIN_SUCCESS',  
                    },
                    {
                        type: 'LOGIN_FAILURE',  
                    }
                ],
            }
        }
    },
    loginFacebook: function () {
        return {
            [CALL_API]: {
                endpoint: 'http://rest.learncode.academy/api/learncode/friends',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${api.token}`
                },
                types: [
                    {
                        type: 'REQUEST',
                        payload: (action) => {
                            return {
                                endpoint: action[CALL_API].endpoint
                            };
                        }
                    },
                    {
                        type: 'LOGIN_SUCCESS',  
                    },
                    {
                        type: 'LOGIN_FAILURE',  
                    }
                ],
            }
        }
    },
    createAccount: function (emailAddress, password) {
        console.log("creating: " + emailAddress +",  " + password);
        return {
            [CALL_API]: {
                endpoint: 'http://rest.learncode.academy/api/learncode/friends',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${api.token}`
                },
                types: [
                    {
                        type: 'REQUEST',
                        payload: (action) => {
                            return {
                                endpoint: action[CALL_API].endpoint
                            };
                        }
                    },
                    {
                        type: 'LOGIN_SUCCESS',  
                    },
                    {
                        type: 'LOGIN_FAILURE',  
                    }
                ],
            }
        }
    }
}

export default userDataActions;