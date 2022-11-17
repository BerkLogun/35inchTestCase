import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/'
});

// fetch all news 
export const fetchNews = async () => API.get('/news');

// fetch single news
export const fetchSingleNews = async (id) =>  await API.get(`/news/${id}`);

// create a new news
export const createNews = async (newsData) => {
    await API.post('/news/create', newsData)
};

// update a news
export const updateNews = async (id, updatedData) => {
    await API.put(`/update/${id}`, updatedData)
};

// delete a news
export const deleteNews = async (id) => {
    await API.delete(`/news/${id}`)
};

