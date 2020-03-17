import {combineReducers} from 'redux';
import dataReducer from './data';
import sortedDataReducer from './sortedData';

export default combineReducers({
    data: dataReducer,
    sortedData: sortedDataReducer
});