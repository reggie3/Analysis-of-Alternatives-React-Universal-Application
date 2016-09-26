let criterionActions = {
    updateCriterionWeight: function (id, weight) {
        return (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CRITERION_WEIGHT',
                weight: weight,
                id: id
            });
            dispatch({type: 'UPDATE_ALL_SCORES'});
        }
    },
    updateInvertedScoring: function(id, bolUseInvertedScoring){
        return (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CRITERION_USE_INVERTED_SCORING',
                bolUseInvertedScoring: bolUseInvertedScoring,
                id: id
            });
           dispatch({type: 'UPDATE_ALL_SCORES'});
        }
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
     * addCriteria
     * Adds a new criterion to the state
     */
    addCriterion: function (newCriterion, alternatives, criteria) {
        return (dispatch, getState) => {
            dispatch({
                type: "ADD_CRITERION",
                criterion: newCriterion,
                criteria: criteria
            });

            dispatch({type: 'UPDATE_ALL_SCORES'});
            dispatch({type: 'SORT_CRITERIA'});
        }
    },
    sortCriteria: function(){
        return {
            type: 'SORT_CRITERIA',
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
    
}

export default criterionActions;