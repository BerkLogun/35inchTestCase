import {FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE} from '../constants/actionConstants'

import * as api from '../axios'

export const fetchNews = () => async (dispatch) => {
    try {
    const {data} = await api.fetchNews();

    dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createNews = (news) => async (dispatch) => {
    try {
        const {data} = await api.createNews(news);

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deleteNews = (id) => async (dispatch) => {
    try {
        await api.deleteNews(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const updateNews = (id, news) => async (dispatch) => {
    try {
        const {data} = await api.updateNews(id, news);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

