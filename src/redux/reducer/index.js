import { productReducer, selectedProductReducer } from './productReducers';
import authReducer from './authReducer';
import favoritesReducer from './favoritesReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import checkReducer from './checkReducer';

const reducers = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    allProducts : productReducer,
    product : selectedProductReducer,
    auth : authReducer,
    favorites : favoritesReducer,
    cart : cartReducer,
    check : checkReducer,
})


export default reducers;