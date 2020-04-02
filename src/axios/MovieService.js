import axios from "./axios"

const MovieService = {
    fetchMovies: () => {
        return axios.get("/api/movies")
    },
    getMovie: (movieId) =>{
        return axios.get(`/api/movies/${movieId}`);
    }

};
export default MovieService;