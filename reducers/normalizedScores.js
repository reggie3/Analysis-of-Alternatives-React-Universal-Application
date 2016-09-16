import utilities from "../utilities/utilities";

export default function normalizedScores(normalizedScores = [[]], action) {
    let newNormalizedScores = [[]];
    switch (action.type) {

        // normalize alternative scores in each criterion
        case "UPDATE_NORMALIZED_SCORES":
            // loop through criteria
            action.criteria.forEach((criterion) => {
                let critID = criterion.id;
                let critScores = [];

                // loop through alternatives in order to gather the raw 
                // scores in each and perform normalization calculations
                action.alternatives.forEach((alternative) => {
                    let altID = alternative.id;
                    // create an array of all the alternatives scores for this criterion
                    critScores.push(action.scores[altID][critID])
                });

                // loop through the alternatives again
                action.alternatives.forEach((alternative) => {
                    // store the alternative id because it will be the 
                    // first index of the 2D array holding the normalized scores
                    let altID = alternative.id;

                    // create an empty array inside the alternative's array
                    // to hold the normalized scores
                    // for this alternative
                    if (newNormalizedScores[altID] === undefined) {
                        newNormalizedScores[altID] = [];
                    }
                    // get the normalized score for this alternative / criterion combination
                    // check to see if this criteria uses inverse scoring
                    if (action.criteria[critID].useInvertedScoring) {
                          newNormalizedScores[altID][critID] = 1 - utilities.getNormalizedNumber(action.scores[altID][critID], critScores)
                    }
                    else{
                    newNormalizedScores[altID][critID] =
                        utilities.getNormalizedNumber(action.scores[altID][critID], critScores)
                    }
   
                });
            });


            return newNormalizedScores;

        default:
            return normalizedScores;
    }
}