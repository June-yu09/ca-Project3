import { ActionTypes } from '../actionTypes';

const initState = {};

const authReducer = (state=initState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { ...state, user: action.payload };
        case ActionTypes.SIGN_IN_ERR:
            console.log('SignIn error');
            return state;
        case ActionTypes.SIGN_OUT:
            console.log('You are logged out');
            return state;
        case ActionTypes.SIGN_UP:
            console.log("Signed Up successfully");
            return state;
        case ActionTypes.SIGN_UP_ERR:
            console.log('SignUp error');
            return state;
        default:
            return state;
    }
}

export default authReducer;