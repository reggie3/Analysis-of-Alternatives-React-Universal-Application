import utilities from "../utilities/utilities";

export default function weightedScores(weightedScores = [[]], action) {
    let newWeightedScores = [[]];
    switch (action.type) {

        // confirm that every alternative has a default entry for every scores
        // and if it doesn't then create it
        case "UPDATE_WEIGHTED_SCORES":

            action.normalizedScores.forEach((normalizedScoresRow, rowIndex)=>{
                if (newWeightedScores[rowIndex] === undefined) {
                    newWeightedScores[rowIndex] = [];
                }
                normalizedScoresRow.forEach((normalizedScore, normalizedScoreIndex) =>{
                    let criteriaWeight = utilities.getCriteriaByID(action.criteria, normalizedScoreIndex).weight;
                    //console.log("crit: " + action.criteria[normalizedScoreIndex].id + " " + 
                    //    "weight: " + action.criteria[normalizedScoreIndex].weight);
                    let weightedScore = normalizedScore * criteriaWeight;
                    newWeightedScores[rowIndex][normalizedScoreIndex] = Number(weightedScore);
                })
            })

            return newWeightedScores;

/*
        case "DELETE_FROM_WEIGHTED_SCORE_GRID":
            newWeightedScores = weightedScores.map(function (arr) {
                return arr.slice();
            });
            console.log("deleting weighted scores");
            if (action.deleteType === "alternative") {
                newWeightedScores[action.id] = [];
            }
            else if (action.deleteType === "criterion") {
                newWeightedScores.forEach((criteriaScores) => {
                    criteriaScores[action.id] = undefined;
                });
            }
            else {
                console.error("ERROR: you shouldn't be here.");
            }
            return newWeightedScores;
*/
        default:
            return weightedScores;
    }
}