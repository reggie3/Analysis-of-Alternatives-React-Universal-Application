export default function activeGraphIndex(activeGraphIndex = 0, action) {
    switch (action.type) {
        case 'UPDATE_ACTIVE_GRAPH_INDEX':
            return action.activeGraphIndex;

        default:
            return activeGraphIndex;
    }
}