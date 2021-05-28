import { ActionTypes } from '../actionTypes';

const initState = {
    products : []
};

const cartReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {...state, products : [...state.products, action.payload]}
        default:
            return state;
    }
}

export default cartReducer;