import axios from "./axios"

const MovieService = {
    fetchMovies: (pageNumber, pageSize, params) => {
        params.set("pageNumber", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/movies", {params: params});
    },
    getMovie: (movieId) =>{
        return axios.get(`/api/movies/${movieId}`);
    },

    createMovie : (formData) => {
        return axios.post(`/api/movies`, formData)
    },
    editMovie: (movieId, modifiedMovie) => {
        return axios.patch(`/api/movies/${movieId}`, modifiedMovie);
    },

};
export default MovieService;