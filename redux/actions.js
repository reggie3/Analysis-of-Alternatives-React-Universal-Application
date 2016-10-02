import userDataActions from './userDataActions';
import criteriaActions from './criteriaActions';
import alternativesActions from './alternativesActions';
import scoresActions from './scoresActions';
import modalDisplayActions from './modalDisplayActions';
import cognitoActions from './cognitoActions';
import auth0Actions from './auth0Actions';


let localActions = {  

    updateActiveGraphIndex(index){
        return{
            type: 'UPDATE_ACTIVE_GRAPH_INDEX',
            activeGraphIndex: index
        }
    },
}

export const actions = Object.assign({},  
    userDataActions, criteriaActions, 
    alternativesActions, scoresActions, 
    localActions, modalDisplayActions,
    cognitoActions, 
    auth0Actions);

