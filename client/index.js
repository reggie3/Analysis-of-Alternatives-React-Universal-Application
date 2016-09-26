// modules/routes.js
import React from 'react';
import {render} from 'react-dom';
import {Provider } from 'react-redux';
import {Router, Route, browserHistory, IndexRoute } from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import store, {history} from '../redux/store';
import '../styles/master.scss';
import App from '../pages/App';
import About from '../pages/About';
import Analysis from '../pages/Analysis';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import StoreProvider from '../pages/StoreProvider';

import actions from '../redux/actions'


const onEnter = function(nextState, replace) {
    /*const state = store.getState();
    const auth = state.userData.auth;
    // You should now have access to both dispatch and getState
    if (!auth.loggedIn()) {
        console.log("not logged in");
        //TODO: show login screen
        if (actions) {
            store.dispatch(actions.showLoginScreen);
        }
    }*/
    console.log("here");;
}


render(
    <Provider store ={store}>
        <Router history={history}>
            <Route path="/" component={App} >
                <IndexRoute component={Home}/>
                <Route path = "/about" component = {About}/>
                <Route path = "/analysis" component = {Analysis}/>
                <Route path = "/profile" component = {Profile} onEnter={onEnter(store)}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)

