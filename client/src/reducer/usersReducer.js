import {AUTH, SIGNUP_FAIL, LOGOUT, LOGOUT_FAIL, REFRESH_ACCESS_TOKEN_SUCCESS, REFRESH_ACCESS_TOKEN_FAIL} from '../constants/actionConstants.js';

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

        case REFRESH_ACCESS_TOKEN_SUCCESS:
           const data = {user: state.userData.user, accessToken: action.payload}
              localStorage.setItem('user', JSON.stringify(data)) // refresh user data with new access token
              
            return {...state, userData: data}

        case REFRESH_ACCESS_TOKEN_FAIL:
            return { error: action.payload} // return error message

        

            


        default:
            return state;
    }
}

export default userReducer;