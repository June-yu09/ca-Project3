import { ActionTypes } from '../actionTypes';

const initState = {
    products : []
}

export const productReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            let productList = {...state, products : action.payload};
            let newList = productList.products.map(product => {
                return {...product, quan: 5};
            })
            return {...state, products : [...newList]};
        default:
            return state;
    }
}
export const selectedProductReducer = (state={}, action) =>{
    switch (action.type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {...state, ...action.payload, quan: 5};
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return {};
        default:
            return state;
    }
}
