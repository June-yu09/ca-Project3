import { ActionTypes } from '../actionTypes';

const initState = {
    products : [],
    isLoading : false,
    error : [],
}

export const productReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PRODUCTS_REQUEST:
            return {...state, isLoading : action.payload};
        case ActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {...state, products : action.payload , isLoading : false};
        case ActionTypes.FETCH_PRODUCTS_FAIL:
            return {...state, isLoading: false , error: action.payload};
        case ActionTypes.FETCH_MEN_PRODUCTS:
            return {...state, products : action.payload};
        case ActionTypes.FETCH_WOMEN_PRODUCTS:
            return {...state, products : action.payload};
        case ActionTypes.FETCH_JE_PRODUCTS:
            return {...state, products : action.payload};
        case ActionTypes.FETCH_EL_PRODUCTS:
            return {...state, products : action.payload};
        default:
            return state;
    }
}
export const selectedProductReducer = (state={}, action) =>{
    switch (action.type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {...state, ...action.payload};
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return {};
        default:
            return state;
    }
}
