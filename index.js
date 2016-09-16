import React from 'react'
import {Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';

import routes from './modules/routes';


render(
   
    <Router
        routes={routes}
        history={browserHistory}/>,
    document.getElementById('app')
);
