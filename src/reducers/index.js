import {combineReducers} from 'redux';
//import loads from './loads';
import config from './config';
import search from './search';

//逻辑复用
const createFilteredReducer=(reducerFunction,reducerPredicate)=>{
	return (state,action)=>{
		const isInitializationCall=state==undefined;
		const shouldRunWrappedReducer=reducerPredicate(action) || isInitializationCall;
		return shouldRunWrappedReducer ? reducerFunction(state,action):state;
	}
}

export default combineReducers({
	config,
	search
})