import { ActionTypes } from '../actionTypes';

const initState = {
    products : []
};

const cartReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            console.log('Added to Cart');
            return state;
        case ActionTypes.ADD_TO_CART_ERR:
            console.log('cart err');
            return state;
        case ActionTypes.REMOVE_FROM_CART:
            console.log('removed from cart');
            return state;
        default:
            return state;
    }
}

export default cartReducer;