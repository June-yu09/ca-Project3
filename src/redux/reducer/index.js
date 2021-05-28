import { productReducer, selectedProductReducer } from './productReducers';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    allProducts : productReducer,
    product : selectedProductReducer,
    auth : authReducer,
    favorites : favoritesReducer,
    cart : cartReducer,
})


export default reducers;