import { ActionTypes } from '../actionTypes';


const initState = {favorites : [] };

const favoritesReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITES:
            console.log('Added!')
            return state;
        case ActionTypes.ADD_FAVORITES_ERR:
            console.log('Added Error')
            return state;
        default:
            return state;
    }
}


export default favoritesReducer;