import {AUTH, SIGNUP_FAIL, LOGOUT, LOGOUT_FAIL} from '../constants/actionConstants.js';

const userReducer = (state = {userData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('user', JSON.stringify(action.payload)) // store user data in local storage
            return {...state, userData: action.payload}

        case SIGNUP_FAIL:
            return { error: action.payload}  // return error message

        case LOGOUT:
            localStorage.removeItem('user'); // clear local storage
            return {...state, userData: null} // clear user data

        case LOGOUT_FAIL:
            return { error: action.payload} // return error message
            


        default:
            return state;
    }
}

export default userReducer;