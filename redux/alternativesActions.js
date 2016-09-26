let alternativesActions={
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
             dispatch({type: 'UPDATE_ALL_SCORES'});
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
    sortAlternatives: function(){
        return {
            type: 'SORT_ALTERNATIVES',
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
}

export default alternativesActions;
