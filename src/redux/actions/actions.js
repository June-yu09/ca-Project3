import { ActionTypes } from '../actionTypes';
import axios from 'axios';


export const fetchProducts = () => (dispatch) => {
    dispatch({type: ActionTypes.FETCH_PRODUCTS_REQUEST, payload: true});

    axios.get('https://fakestoreapi.com/products')
    .then(result => {
        return dispatch({type:ActionTypes.FETCH_PRODUCTS_SUCCESS, payload: result.data })
    })
    .catch(err=> dispatch({type: ActionTypes.FETCH_PRODUCTS_FAIL, payload: err}))
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
export const favoriteProduct = product => {
    return {
        type : ActionTypes.FAVORITE_PRODUCT,
        payload : product,
    }
}
export const addToCart = product => {
    return {
        type : ActionTypes.ADD_TO_CART,
        payload : product,
    }
}