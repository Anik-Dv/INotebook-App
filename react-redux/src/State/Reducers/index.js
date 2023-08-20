
import { combineReducers } from "redux";
import amountReducer from './AmountReducer';
const reducers = combineReducers({
    amount: amountReducer
});

export default reducers;