import {FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE} from '../constants/actionConstants'

export default (news = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...news, action.payload];

        case UPDATE:
            return news.map((news) => news.id === action.payload.id ? action.payload : news);

        case DELETE:
            return news.filter((news) => news.id !== action.payload);


        default: return news;
    };
}