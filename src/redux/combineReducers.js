import { productReducer } from './reducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    allProducts : productReducer,
})


export default reducers;