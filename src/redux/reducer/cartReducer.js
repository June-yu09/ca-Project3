import { ActionTypes } from '../actionTypes';

const initState = {
    products: [],
    amount : [],
    };

const cartReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {...state, products : [ ...state.products, action.payload ], amount: [ ...state.amount, { ...action.payload } ]};
        case ActionTypes.ADD_TO_CART_ERR:
            console.log('cart err');
            return state;
        case ActionTypes.REMOVE_FROM_CART:
            return { ...state, products : [ ...state.products.filter(product=>product!==action.payload) ] }
        case ActionTypes.CART_CHECK:
            return { ...state, products : [ ...action.payload ] }
        
        default:
            return state;
    }
}

export default cartReducer;