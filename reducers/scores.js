export default function scores(scores = [[]], action) {
    let newScores = scores;
    switch (action.type) {

        // confirm that every alternative has a default entry for every scores
        // and if it doesn't then create it
        case "UPDATE_SCORE_GRID":
            newScores = scores.map(function (arr) {
                return arr.slice();
            });

            action.alternatives.forEach((alternative) => {
                if (newScores[alternative.id] === undefined) {
                    newScores[alternative.id] = [];
                }
                action.criteria.forEach((criteria) => {
                    if (newScores[alternative.id][criteria.id] === undefined) {
                        newScores[alternative.id][criteria.id] = 0;
                        console.log("creating score: " + alternative.id + ", " + criteria.id + " : " + newScores[alternative.id][criteria.id]);
                    }
                })
            });

            //console.table(newScores);
            return newScores;

        case "DELETE_FROM_SCORE_GRID":
            newScores = scores.map(function (arr) {
                return arr.slice();
            });
            // console.log("deleting scores");
            if (action.deleteType === "alternative") {
                newScores[action.id] = [];
            }
            else if (action.deleteType === "criterion") {
                newScores.forEach((criteriaScores) => {
                    criteriaScores[action.id] = undefined;
                });
            }
            else {
                console.error("ERROR: you shouldn't be here.");
            }
            return newScores;

        case "UPDATE_SCORE":
            newScores = scores.map(function (arr) {
                return arr.slice();
            });
            newScores[action.altID][action.critID] = action.score;
            return newScores;
        default:
            return scores;
    }
}