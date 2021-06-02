import { ActionTypes } from '../actionTypes';
import axios from 'axios';


export const fetchProducts = () => async (dispatch) => {
    
    dispatch({type: ActionTypes.FETCH_PRODUCTS_REQUEST, payload: true});
    try { 
        const response = await axios.get('https://fakestoreapi.com/products');
        return dispatch({type:ActionTypes.FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (err){
        return dispatch({type: ActionTypes.FETCH_PRODUCTS_FAIL })
    }
  
}

export const selectedProduct = product => {
    return {
        type : ActionTypes.SELECTED_PRODUCT,
        payload : product,
    }
}

export const removeSelectedProduct = ()=>{
    return {
        type : ActionTypes.REMOVE_SELECTED_PRODUCT,
    }
}

export const favoriteProduct = product => (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const userId = getState().firebase.auth.uid;

    firestore
    .collection('favorites')
    .add({
        ...product,
        userId : userId
    })
    .then(()=>{
        dispatch({ type: ActionTypes.ADD_FAVORITES, payload : product });
    })
    .catch(err=>{
        dispatch({ type: ActionTypes.ADD_FAVORITES_ERR, err });
    })
}

export const addToCart = product => (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const userId = getState().firebase.auth.uid;

    firestore
    .collection('cart')
    .add({
        ...product,
        userId : userId
    })
    .then(()=>{
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: product });
    })
    .catch(err=>{
        dispatch({ type: ActionTypes.ADD_TO_CART_ERR, err })
    })
}
export const removeFromCart = product => (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

    firestore
    .collection('cart')
    .doc(product)
    .delete()
    .then(()=>{
        dispatch({ type: ActionTypes.REMOVE_FROM_CART });
    })
}


export const signIn = credentials => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(()=>{
        dispatch({ type: ActionTypes.SIGN_IN });
    })
    .catch(err=>{
        console.log('signIn error in actions');
        dispatch({ type: ActionTypes.SIGN_IN_ERR}, err);
    })
    
}

export const signOut = () => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
    .auth()
    .signOut()
    .then(()=>{
        dispatch({type: ActionTypes.SIGN_OUT});
    })
    
}

export const signUp = (credentials) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(()=> {
        dispatch({type: ActionTypes.SIGN_UP});
    })
    .catch(err=> {
        dispatch({type: ActionTypes.SIGN_UP_ERR}, err);
    })
}