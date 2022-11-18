import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/'
});


API.interceptors.request.use((req) => {
    if(localStorage.getItem('user'))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`;
    return req;
});


// fetch all news 
export const fetchNews = async () => API.get('/news');

// fetch single news
export const fetchSingleNews = async (id) =>  await API.get(`/news/${id}`);

// create a new news
export const createNews = async (newsData) => await API.post('/news/create', newsData)

// update a news
export const updateNews = async (id, updatedData) => await API.put(`news/update/${id}`, updatedData)


// delete a news
export const deleteNews = async (id) =>  await API.delete(`/news/${id}`)


export const signup = async (formData) => await API.post('users/signup', formData)

export const signin = async (formData) => await API.post('users/signin', formData)

export const logOut = async (id) => await API.get(`/users/logout/${id}`, id)

export const refreshAccessToken = async (id) => {
    try{
        const {data} = await API.get(`users/refresh/${id}`);
        console.log(data)
        return data;
    }
    catch(error){
        console.log(error);
    }
}


