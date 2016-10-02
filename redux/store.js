import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from "../reducers/rootReducer";
// import promiseMiddleware from 'redux-promise-middleware';
// import combineActionsMiddleware from 'redux-combine-actions';
import thunk from 'redux-thunk';

import secrets from '../config/secrets';
import AuthService from '../utilities/AuthService';

const auth = new AuthService(
  secrets.auth0.clientID, secrets.auth0.domain
  );

const logger = createLogger();
//const promise = promiseMiddleware();

let defaultState = {
  userData: {
    token: null,
    id: 1,
    auth: auth,
    loggedIn: false,
  },
  
  cognito: {
    userPool: undefined
  },
  
  auth0:{
    loggedIn: false,
    profile:{
      email:"",
      nickname:""
    }
  },
  modalDisplay: {
    showLogin: false,
    showCreateAccount: false,
    showAccountCreationFeedback: false
  },
  alternatives: [{
    id: 0,
    name: "Red Mustang",
    description: "Red Mustang at Sam's car Shack .",
  },
    {
      id: 1,
      name: "Blue Camaro",
      description: 'Lorem ipsum dolor.',
    },
    {
      id: 2,
      name: "Black Charger",
      description: 'Lorem ipsum dolor sit amet.',
    }],
  criteria: [{
    id: 0,
    name: "Highest Speed",
    description: 'Lorem ipsum .',
    weight: 8,
    useInvertedScoring: false
  },
    {
      id: 1,
      name: "Lowest Price",
      description: 'Lorem ipsum dolor .',
      weight: 3,
      useInvertedScoring: true
    },
    {
      id: 2,
      name: "Distance From Me",
      description: 'Lorem ipsum dolor sit .',
      weight: 5,
      useInvertedScoring: true
    }],
  scores: [
    [150, 17000, 90],
    [120, 15000, 25],
    [90, 19000, 50]
  ],
  normalizedScores: [[]],
  weightedScores: [[]],
  activeGraphIndex: 0,
  graphNames: [
    "Criteria Weights",
    "Raw Scores",
    "Normalized Scores",
    "Weighted Scores"
  ]
};

const middleware = applyMiddleware(thunk, logger, apiMiddleware);
const store = createStore(rootReducer, defaultState, compose (middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f));
/*

let finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


export default function configureStore(initialState = { criteria: [], alternatives: [] }) {
  return finalCreateStore(reducer, defaultState)
}
*/
export default store;
export const history = syncHistoryWithStore(browserHistory, store);
