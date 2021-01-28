import axios from 'axios';


const axiosAPI = axios.create({
    baseURL: 'https://api.themoviedb.org'
});

axiosAPI.defaults.params = {};
axiosAPI.interceptors.request.use((config) => {
    config.params = {api_key: '4ace743c305aa230d4f5524f5f920a22'}
    return config
})


export default axiosAPI;
