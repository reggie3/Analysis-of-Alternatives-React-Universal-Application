import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducer from "../reducers/reducer";
// import promiseMiddleware from 'redux-promise-middleware';
// import combineActionsMiddleware from 'redux-combine-actions';
import thunk from 'redux-thunk';


const logger = createLogger();
//const promise = promiseMiddleware();

let finalCreateStore = compose(
  applyMiddleware(thunk, logger)
)(createStore);


export default function configureStore(initialState = { criteria:[], alternatives:[] }) {
  return finalCreateStore(reducer, initialState)
}

/*
export default function configureStore(initialState = {criteria:[], alternatives:[]}){
    // Creates a Redux store that holds the complete state tree of your app.
    return createStore(reducer, initialState, applyMiddleware(logger));
}
*/