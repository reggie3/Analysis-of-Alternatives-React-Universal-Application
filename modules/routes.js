// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../pages/App';
import About from '../pages/About';
import Analysis from '../pages/Analysis';
import Profile from '../pages/Profile';
import Home from '../pages/Home';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path = "/about" component = {About}/>
    <Route path = "/analysis" component = {Analysis}/>
    <Route path = "/profile" component = {Profile}/>
  </Route>
)