import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './../components/App';
import configureStore from '../redux/store';
import routes from '../modules/routes';
import '../styles/master.scss'


// connect store to components that need to know about it
// Provider wraps around app and gets the store that is pasted to it as a prop
import { Provider } from 'react-redux';


let initialState = {
    alternatives: [{
        id: 0,
        name: "Red Mustang",
        description: "Red Mustang at Sam's car Shack.",
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

// configure and create our store
let store = configureStore(initialState);
console.log(store);

render(
    <Provider store ={store}>
        <Router
            routes={routes}
            history={browserHistory}/>
    </Provider>,
    document.getElementById('app')
)