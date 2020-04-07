import axios from 'axios';

const getTokenFromLocalStorage = () => {
    const userString = localStorage.getItem("Authorization");
    if (userString !== null)
        return userString;
    return "";
};

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = getTokenFromLocalStorage();
    return config;
});





export default instance;
