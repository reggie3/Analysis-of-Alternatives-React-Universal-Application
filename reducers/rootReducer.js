import Update from 'react/lib/update';
import { combineReducers } from 'redux';


import alternatives from './alternatives';
import criteria from './criteria';
import scores from './scores';
import normalizedScores from './normalizedScores';
import weightedScores from './weightedScores';
import activeGraphIndex from './activeGraphIndex';
import graphNames from './graphNames';
import userData from './userData';
import modalDisplay from './modalDisplay';
import cognito from './cognito';
import auth0 from './auth0';

import {routerReducer} from 'react-router-redux';

const rootReducer =  combineReducers({
        criteria,
        alternatives,
        scores,
        normalizedScores,
        weightedScores,
        activeGraphIndex,
        graphNames,
        userData,
        modalDisplay,
        cognito,
        auth0,
        routing: routerReducer
});
export default rootReducer;
