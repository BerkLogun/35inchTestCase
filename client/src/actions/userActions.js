import {AUTH, SIGNUP_FAIL, LOGOUT, LOGOUT_FAIL, REFRESH_ACCESS_TOKEN_SUCCESS, REFRESH_ACCESS_TOKEN_FAIL} from '../constants/actionConstants.js';
import * as api from '../axios';



export const signup = (formData, navigate) => async (dispatch) => {
    try {

        const {data} = await api.signup(formData);
        dispatch({type: AUTH, payload: data});
        navigate('/dashboard');
        
    } catch (error) {
        dispatch({type: SIGNUP_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message : error.message});  // error message handling such as passwords not matching or username already taken
    }

}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
    const {data} = await api.signin(formData);
    dispatch({type: AUTH, payload: data});
    navigate('/dashboard');
    } catch (error) {
        console.log(error);
    }

}


export const logOut = (id) => async (dispatch) => {
    try {
        const { message } = await api.logOut(id);
        dispatch({type: LOGOUT, payload: message});
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response && error.response.data.message});
        console.log(error);
    }
}

export const getAccessToken = (id) => async (dispatch) => {
    try{
        const {data} = await api.refreshAccessToken(id);
        dispatch({type: REFRESH_ACCESS_TOKEN_SUCCESS, payload: data});
        return data;
    }
    catch(error){
        dispatch({type: REFRESH_ACCESS_TOKEN_FAIL, payload: error.response && error.response.data.message});
        console.log(error);
    }
}