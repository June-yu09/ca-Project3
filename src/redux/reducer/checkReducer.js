import {ActionTypes} from '../actionTypes';

const initState = { userId : ''};

const checkReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_CHECK:
            return {...state, userId : action.payload}
        default:
            return state;
    }
    
    
}

export default checkReducer;