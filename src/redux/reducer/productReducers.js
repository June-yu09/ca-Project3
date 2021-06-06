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
            let productList = {...state, products : action.payload};
            let newList = productList.products.map(product => {
            return {...product, stock: 5, amount: 1};
            })
            return {...state, products : [...newList], isLoading : false};
        
        case ActionTypes.FETCH_PRODUCTS_FAIL:
            return {...state, isLoading: false , error: action.payload}

        default:
            return state;
    }
}
export const selectedProductReducer = (state={}, action) =>{
    switch (action.type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {...state, ...action.payload, amount : 1};
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return {};
        default:
            return state;
    }
}
