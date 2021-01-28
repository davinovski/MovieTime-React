import axios from "./axiosAPI";


const MovieDbService = {

    getGenres:  () => {
        return axios.get(`/3/movie/upcoming`);
    }

};
export default MovieDbService;