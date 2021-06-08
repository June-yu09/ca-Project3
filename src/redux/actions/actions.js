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

export const fetchMenProducts = () => async (dispatch) => {
    const response = await axios.get("https://fakestoreapi.com/products/category/men's%20clothing");
    return dispatch({ type: ActionTypes.FETCH_MEN_PRODUCTS, payload: response.data })
}

export const fetchWomenProducts = () => async (dispatch) => {
    const response = await axios.get("https://fakestoreapi.com/products/category/women's%20clothing");
    return dispatch({ type: ActionTypes.FETCH_WOMEN_PRODUCTS, payload: response.data })
}

export const fetchJeProducts = () => async (dispatch) => {
    const response = await axios.get("https://fakestoreapi.com/products/category/jewelery");
    return dispatch({ type: ActionTypes.FETCH_JE_PRODUCTS, payload: response.data })
}

export const fetchElProducts = () => async (dispatch) => {
    const response = await axios.get("https://fakestoreapi.com/products/category/electronics");
    return dispatch({ type: ActionTypes.FETCH_EL_PRODUCTS, payload: response.data })
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
    .doc(`${product.id}`)
    .set({
        ...product,
        userId : userId
    })
    .then(()=>{
        dispatch({ type: ActionTypes.ADD_FAVORITES, payload : product });
    })
    .catch(err=>{
        dispatch({ type: ActionTypes.ADD_FAVORITES_ERR, err });
    })
    //since I don't want to put repeated item, I put doc name as product ID
}

export const removeFavorite = product => (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

    firestore
    .collection('favorites')
    .doc(`${product.id}`)
    .delete()
    .then(()=>{
        dispatch({ type : ActionTypes.REMOVE_FAVORITES, payload: product});
    })
    .catch(err=>dispatch({type: ActionTypes.REMOVE_FAVORITES_ERR, err}))
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
    .where('id','==', product.id)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.docs[0].ref.delete();
        //delete the first matching data
    })
    .then(()=>{
        dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: product });
    })
}


export const signIn = credentials => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(()=>{
        dispatch({ type: ActionTypes.SIGN_IN});
    })
    .catch(err=>{
        console.log('signIn error in actions');
        dispatch({ type: ActionTypes.SIGN_IN_ERR ,err});
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
        dispatch({type: ActionTypes.SIGN_UP_ERR, err});
    })
}

export const authCheck = (userUid) => {
    return { 
        type: ActionTypes.AUTH_CHECK ,
        payload : userUid
    }
}
export const favoriteCheck = (uid) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore();

    firestore
    .collection('favorites')
    .where('userId','==', uid)
    .get()
    .then((querySnapshot) => {
        const newArr = [];
        querySnapshot.forEach((doc) => {
            newArr.push(doc.data());
            }
        )
        return dispatch({type: ActionTypes.FAVORITE_CHECK, payload: newArr})
    })
    // because delete item makes lagging in state.firestore, I use redux state for displaying(updating) item.
    
}

export const cartCheck = (uid) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore();

    firestore
    .collection('cart')
    .where('userId','==', uid)
    .get()
    .then((querySnapshot)=>{
        const newArr = [];
        querySnapshot.forEach((doc)=>{
            newArr.push(doc.data());
            }
        )
        return dispatch({ type : ActionTypes.CART_CHECK, payload: newArr })
    })
}

export const clearCart = () =>(dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const userId = getState().firebase.auth.uid;

    firestore
    .collection('cart')
    .where('userId','==', userId)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            doc.ref.delete();
        })
    })
    .then(()=>{
        dispatch({ type : ActionTypes.CLEAR_CART});
    })
}