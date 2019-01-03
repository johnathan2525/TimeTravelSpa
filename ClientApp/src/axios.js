import axios from 'axios';

const $axios = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

export default $axios;