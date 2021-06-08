import { ActionTypes } from '../actionTypes';


const initState = {
    products: [],
    };

const cartReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            console.log('added to cart');
            console.log('payload in reducer:',action.payload);
            console.log('state.products in reducer', state.products)
            return {...state, products : [ action.payload, ...state.products ]};
        case ActionTypes.ADD_TO_CART_ERR:
            console.log("cart err");
            return state;
        case ActionTypes.REMOVE_FROM_CART:
            return { ...state, products : [ ...state.products.filter(product=>product!==action.payload) ] }
        case ActionTypes.CART_CHECK:
            return { ...state, products : action.payload }
        case ActionTypes.CLEAR_CART:
            return {};
        default:
            return state;
    }
}

export default cartReducer;