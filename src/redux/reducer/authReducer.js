import { ActionTypes } from '../actionTypes';

const initState = {};

const authReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return state;
        case ActionTypes.SIGN_IN_ERR:
            return state;
        case ActionTypes.SIGN_OUT:
            return state;
        case ActionTypes.SIGN_UP:
            return state;
        case ActionTypes.SIGN_UP_ERR:
            return state;
        default:
            return state;
    }
}

export default authReducer;