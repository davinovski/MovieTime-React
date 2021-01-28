import axios from "./axios"

const MovieService = {
    fetchMovies: (pageNumber, pageSize, params) => {
        params.set("pageNumber", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/movies/paged", {params: params});
    },
    getMovie: (movieId) =>{
        return axios.get(`/api/movies/${movieId}`);
    },

    getAllMovies : () =>{
        return axios.get("/api/movies/all");
    },

    createMovie : (formData) => {
        return axios.post(`/api/movies`, formData)
    },

    editMovie: (movieId, modifiedMovie) => {
        return axios.patch(`/api/movies/${movieId}/edit`, modifiedMovie);
    },

    deleteMovie : (movieId) => {
        return axios.post(`/api/movies/${movieId}/delete`);
    },
    toggleFavourites : (movieId) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userId=userData.id;
        return axios.post(`/api/users/${userId}/favourites/${movieId}`);
    },

    getAllFavourites : (pageNumber, pageSize, params) => {
        params.set("pageNumber", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/movies/favorites", {params: params});
},
    getAllWatched : (pageNumber, pageSize, params) => {
        params.set("pageNumber", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/movies/watched", {params: params});
    },

    getAllWatchedByUser : () => {
        return axios.get("/api/movies/allWatched");
    },

    getMostWatched : () => {
        return axios.get("/api/movies/mostwatched");
    },

    fetchComments : (movieId) => {
        return axios.get(`/api/movies/${movieId}/comments`);
    },

    getDirectedMovies : (personId) => {
        return axios.get(`api/movies/directed/${personId}`);
    },

    getWrittenMovies : (personId) => {
        return axios.get(`api/movies/written/${personId}`);
    },

    getStarredMovies : (personId) => {
        return axios.get(`api/movies/starred/${personId}`);
    }
};
export default MovieService;