import { productReducer, selectedProductReducer } from './productReducers';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const reducers = combineReducers({
    allProducts : productReducer,
    product : selectedProductReducer,
    auth : authReducer,
    favorites : favoritesReducer,
    cart : cartReducer,
    firebase : firebaseReducer,
    firestore : firestoreReducer,
})


export default reducers;