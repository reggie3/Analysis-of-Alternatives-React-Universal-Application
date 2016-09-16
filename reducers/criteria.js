function getCriteriaId(criteria) {
    let max = criteria.reduce((maxId, criterion) => {
        return Math.max(criterion.id, maxId)
    }, -1);
    return max + 1;
}

export default function criteria(criteria = [], action) {
    // create two empty objects to keep track of stuff
    let updatedCriteria = [], updatedCriterion = {};
    switch (action.type) {
        case "ADD_CRITERION":
            
            let newCriteriaObject = {
                name: action.criterion.name,
                description: action.criterion.description,
                weight: action.criterion.weight,
                id: getCriteriaId(criteria)
            }
            updatedCriteria = criteria.concat(newCriteriaObject);
            updatedCriteria = _.orderBy(updatedCriteria, ['name'], ['asc']);

            return updatedCriteria

        case "DELETE_CRITERION":
            //TODO: remove all entries for this criterion from all the alternatives' "scoring" lists
            // set the default score to 0
            return criteria.filter((item) => {
                return item.id !== action.id;
            });

        case "UPDATE_CRITERION_NAME":
            updatedCriterion = criteria.filter((item) => {
                return item.id === action.id;
            })[0];

            updatedCriterion.name = action.name;

            updatedCriteria = criteria.filter((crit) => {
                return crit.id !== action.id;
            }).concat(updatedCriterion);

            updatedCriteria = _.orderBy(updatedCriteria, ['name'], ['asc']);
            return updatedCriteria;

        case "UPDATE_CRITERION_WEIGHT":
            updatedCriterion = criteria.filter((item) => {
                return item.id === action.id;
            })[0];

            updatedCriterion.weight = action.weight;

            updatedCriteria = criteria.filter((crit) => {
                return crit.id !== action.id;
            }).concat(updatedCriterion);
            updatedCriteria = _.orderBy(updatedCriteria, ['name'], ['asc']);
            return updatedCriteria;

        case "UPDATE_CRITERION_USE_INVERTED_SCORING":
            updatedCriterion = criteria.filter((item) => {
                return item.id === action.id;
            })[0];

            updatedCriterion.useInvertedScoring = action.bolUseInvertedScoring;

            updatedCriteria = criteria.filter((crit) => {
                return crit.id !== action.id;
            }).concat(updatedCriterion);
            updatedCriteria = _.orderBy(updatedCriteria, ['name'], ['asc']);
            return updatedCriteria;

        case "UPDATE_CRITERION_DESCRIPTION":
            updatedCriterion = criteria.filter((item) => {
                return item.id === action.id;
            })[0];

            updatedCriterion.description = action.description;

            updatedCriteria = criteria.filter((crit) => {
                return crit.id !== action.id;
            }).concat(updatedCriterion);
            updatedCriteria = _.orderBy(updatedCriteria, ['name'], ['asc']);
            return updatedCriteria;

        default:
            return criteria;
    }
}