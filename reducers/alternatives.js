import _ from 'lodash';

function getAlternativeId(alternatives) {
    let max = alternatives.reduce((maxId, alternative) => {
        return Math.max(alternative.id, maxId)
    }, -1);
    return max + 1;
}

export default function alternatives(alternatives = [], action) {
    // create two empty objects to keep track of stuff
    let updatedAlternative = {}, updatedAlternatives = [];

    switch (action.type) {

        case "ADD_ALTERNATIVE":
            console.log("reducer add alternative called");

            let newAlternative = {
                name: action.alternative.name,
                description: action.alternative.description,
                id: getAlternativeId(alternatives),
            };

            updatedAlternatives = alternatives.concat(newAlternative);
            updatedAlternatives = _.orderBy(updatedAlternatives, ['name'], ['asc']);
            return updatedAlternatives;

        case "DELETE_ALTERNATIVE":
            return alternatives.filter((alt) => {
                return alt.id !== action.id;
            });

        case "UPDATE_ALTERNATIVE_DESCRIPTION":
            updatedAlternative = alternatives.filter((alt) => {
                return alt.id === action.id;
            })[0];
            updatedAlternative.description = action.description;

            updatedAlternatives = alternatives.filter((alt) => {
                return alt.id !== action.id;
            }).concat(updatedAlternative);
            updatedAlternatives = _.orderBy(updatedAlternatives, ['name'], ['asc']);
            return updatedAlternatives;

        case "UPDATE_ALTERNATIVE_NAME":
            updatedAlternative = alternatives.filter((alt) => {
                return alt.id === action.id;
            })[0];
            updatedAlternative.name = action.name;
            let otherAlts = alternatives.filter((alt) => {
                return alt.id !== action.id;
            });
            updatedAlternatives = otherAlts.concat(updatedAlternative);
            updatedAlternatives = _.orderBy(updatedAlternatives, ['name'], ['asc']);
            return updatedAlternatives;

        case "ADD_NEW_CRITERION_TO_ALTERNATIVES":
            // add a entry for this criterion in all the alternatives' "scoring" lists
            // set the default score to -1

            // for every alternative
            let updatedAlternatives = alternatives.map((alternative) => {  // iterate through each alternative

                // create the updated alternative
                let updatedAlternative = Object.assign({},
                    alternative,
                    {
                        // keep the previous information in the criteria score
                        // object and add the new info to it
                        criteriaScores: { [action.newCriterion.id]: [action.newCriterion.weight] }
                    });

                // return the now updated alternative
                return updatedAlternative;
            });

            // build the new alternatives array
            let newAlternativesArray = Object.
                keys(updatedAlternatives).map(function (key) {
                    return updatedAlternatives[key]
                });


            return newAlternativesArray;

        default:
            return alternatives;
    }
}