/**
 * create a wrapper around the App route
 * that will provide the store and state to child components
 *  */
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {actions} from '../redux/actions';

import App from './App';

function mapStateToProps(state){
    return{
        state: state
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}

const StoreProvider = connect(mapStateToProps, mapDispatchToProps)(App);

export default StoreProvider;