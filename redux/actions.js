import userDataActions from './userDataActions';
import criteriaActions from './criteriaActions';
import alternativesActions from './alternativesActions';
import scoresActions from './scoresActions';
import modalDisplayActions from './modalDisplayActions';


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
    localActions, modalDisplayActions);

