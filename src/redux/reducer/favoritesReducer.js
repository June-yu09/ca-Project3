import { ActionTypes } from '../actionTypes';


const initState = {
    products : [],
}

const favoritesReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.FAVORITE_PRODUCT:
            return {...state, products : [ ...state.products, action.payload ]}
        default:
            return state;
    }
}


export default favoritesReducer;