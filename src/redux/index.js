import { productReducer, selectedProductReducer } from './reducers';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    allProducts : productReducer,
    product : selectedProductReducer,
})


export default reducers;