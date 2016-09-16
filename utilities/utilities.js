let utilities = {

    getCriteriaByID(criteria, id) {
        let found = criteria.filter((criterion) => {
            return criterion.id === id;
        });
        return found[0];
    },

    getAlternativeByID(alternatives, id) {
        return alternatives.filter((alternative) => {
            return alternative.id === id;
        })[0];
    },
    getAlternativeCriteriaScore(scores, altID, critID) {
        return scores[altID][critID];
    },
    getNormalizedNumber(num, arrayOfNums) {
        let min = Math.min.apply(Math, arrayOfNums);
        let max = Math.max.apply(Math, arrayOfNums);
        if (max !== min) {
            return (num - min) / (max - min);
        }
        else {
            return 1;
        }
    },

    /******
     * sort
     *  standard array sorting algormithm from:
     *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @param {string} a - 1st value for comparison
     * @param {string} b - 2nd value for comparison
     *  */sort(a, b) {
        var nameA = a.toUpperCase(); // ignore upper and lowercase
        var nameB = b.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    }
}

export default utilities;