import { createStore, applyMiddleware, combineReducers, compose, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import * as constants from './constants';
import * as actions from './actions';

const finalCreateStore = compose(applyMiddleware(thunk), createStore);

export const store = finalCreateStore(combineReducers(reducers));

actions._init(store);