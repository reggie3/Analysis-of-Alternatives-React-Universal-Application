
let actions = {
    updateActiveGraphIndex(index){
        return{
            type: 'UPDATE_ACTIVE_GRAPH_INDEX',
            activeGraphIndex: index
        }
    },


    updateAlternativeDescription: function (id, description) {
        return {
            type: 'UPDATE_ALTERNATIVE_DESCRIPTION',
            description: description,
            id: id
        }
    },
    updateAlternativeName: function (id, name) {
        return {
            type: 'UPDATE_ALTERNATIVE_NAME',
            name: name,
            id: id
        }
    },
    updateCriterionWeight: function (id, weight) {
        return (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CRITERION_WEIGHT',
                weight: weight,
                id: id
            });
            actions.updateAllScores(dispatch, getState);
        }
    },

    updateInvertedScoring: function(id, bolUseInvertedScoring){
        return (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CRITERION_USE_INVERTED_SCORING',
                bolUseInvertedScoring: bolUseInvertedScoring,
                id: id
            });
            actions.updateAllScores(dispatch, getState);
        }
    },
    
    updateCriterionDescription: function (id, description) {
        return {
            type: 'UPDATE_CRITERION_DESCRIPTION',
            description: description,
            id: id
        }
    },
    updateCriterionName: function (id, name) {
        return {
            type: 'UPDATE_CRITERION_NAME',
            name: name,
            id: id
        }
    },
    /******************************
     * addCriteria
     * Adds a new criterion to the state
     */
    addCriterion: function (newCriterion, alternatives, criteria) {
        return (dispatch, getState) => {
            // const firstState = getState(); ** don't need this since both values are received as arguments **
            dispatch({
                type: "ADD_CRITERION",
                criterion: newCriterion,
                criteria: criteria
            });

            actions.updateAllScores(dispatch, getState);

        }
    },



    /******************************
     * addAlternative
     * Adds a new alternative to the state
     */
    addAlternative: function (newAlternative, alternatives, criteria) {
        return (dispatch, getState) => {
            // const firstState = getState();
            dispatch({
                type: "ADD_ALTERNATIVE",
                alternative: newAlternative,
                alternatives: alternatives
            });

            // have all the scores update
            actions.updateAllScores(dispatch, getState); 
        }
    },

    /**
     * completeScoreGrid
     * called on app load in the "componentWillMount()" of App.js
     */
    completeScoreGrid(alternatives, criteria) {
        return (dispatch, getState) => {
            actions.updateAllScores(dispatch, getState); 
        }
    },



    /***************************
     * updateAllScores
     * Performs a cascading update to all the scores
     * 
     *  */
    updateAllScores: function(dispatch, getState){
         // get the updated state to pass into the next step
            const state1 = getState();
            dispatch({
                type: "UPDATE_SCORE_GRID",
                criteria: state1.criteria,
                alternatives: state1.alternatives
            });

            // enter the normalized score
            const state2 = getState();
            dispatch({
                type: "UPDATE_NORMALIZED_SCORES",
                scores: state2.scores,
                criteria: state2.criteria,
                alternatives: state2.alternatives
            });

            // enter the weighted score
            const state3 = getState();
            dispatch({
                type: "UPDATE_WEIGHTED_SCORES",
                normalizedScores: state3.normalizedScores,
                criteria: state3.criteria
            });
    },

    /******************************
     * delete criteria and relavent alternative/criteria score combinations
     */
    deleteCriterionAndDeleteAlternativeCritieriaCombintiationToScoreGrid: function (id) {
        return (dispatch, getState) => {
            // const firstState = getState(); ** don't need this since both values are received as arguments **
            dispatch({
                type: "DELETE_CRITERION",
                id: id
            });

            // delete the scores
            dispatch({
                type: "DELETE_FROM_WEIGHTED_SCORE_GRID",
                deleteType: "criterion",
                id: id
            });
        }
    },

    /******************************
     * delete alternative and relavent alternative/criteria score combinations
     */
    deleteAlternativeAndDeleteAlternativeCritieriaCombintiationToScoreGrid: function (id) {
        return (dispatch, getState) => {
            // const firstState = getState(); ** don't need this since both values are received as arguments **
            dispatch({
                type: "DELETE_ALTERNATIVE",
                id: id
            });

            // delete the scores
            dispatch({
                type: "DELETE_FROM_SCORE_GRID",
                deleteType: "alternative",
                id: id
            });
            /*
            // delete the scores
            dispatch({
                type: "DELETE_FROM_WEIGHTED_SCORE_GRID",
                deleteType: "alternative",
                id: id
            });
            */
        }
    },

    updateScore(altID, critID, score) {
        return (dispatch, getState) => {
            dispatch({
                type: "UPDATE_SCORE",
                altID: altID,
                critID: critID,
                score: score
            });

             // enter the normalized score
            const secondState = getState();
            dispatch({
                type: "UPDATE_NORMALIZED_SCORES",
                scores: secondState.scores,
                criteria: secondState.criteria,
                alternatives: secondState.alternatives
            });

            // enter the weighted score
            const thirdState = getState();
            dispatch({
                type: "UPDATE_WEIGHTED_SCORES",
                normalizedScores: thirdState.normalizedScores,
                criteria: thirdState.criteria
            });
        }
    },

    

}

export default actions;