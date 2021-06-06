import { ActionTypes } from '../actionTypes';


const initState = { favorites:[] };

const favoritesReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITES:
            //To avoid adding same product
            if (state.favorites.includes(action.payload)){
                console.log('same product added')
                return state;
            } else {
                console.log('different product added')
                return {...state, favorites: [...state.favorites , action.payload]};
            }
        case ActionTypes.ADD_FAVORITES_ERR:
            console.log('Added Error');
            return state;
        case ActionTypes.REMOVE_FAVORITES:
            console.log('remove favorite success')
            return {...state, favorites: [ ...state.favorites.filter(fav=> fav!==action.payload) ]};
        case ActionTypes.REMOVE_FAVORITES_ERR:
            console.log('Remove Favorites err')
            return state;
        case ActionTypes.FAVORITE_CHECK:
            return {...state, favorites : [...action.payload]};
        default:
            return state;
    }
}


export default favoritesReducer;