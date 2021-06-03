import { ActionTypes } from '../actionTypes';


const initState = {favorites : [] };

const favoritesReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITES:
            console.log('favorite added')
            return state;
        case ActionTypes.ADD_FAVORITES_ERR:
            console.log('Added Error');
            return state;
        case ActionTypes.REMOVE_FAVORITES:
            console.log('remove favorite')
            return state;
        default:
            return state;
    }
}


export default favoritesReducer;