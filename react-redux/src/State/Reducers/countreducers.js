
import { combineReducers } from "redux";
import countReducer from './CountReducer';

export const cardreducers = combineReducers({
    count: countReducer
})


export default cardreducers;