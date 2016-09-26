let scoresActions = {
    
/**
     * completeScoreGrid
     * called on app load in the "componentWillMount()" of App.js
     */
    completeScoreGrid(alternatives, criteria) {
        return {type: 'UPDATE_ALL_SCORES'};
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
    }
}

export default scoresActions;