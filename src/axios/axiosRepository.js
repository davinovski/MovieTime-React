import axios from "./axios"

const MovieService = {
    fetchMovies: () => {
        return axios.get("/api/movies")
    }

};
export default MovieService;