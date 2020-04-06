import axios from "./axios";


const GenresService = {

    getGenres:  () => {
        return axios.get(`/api/genres`);
    }
};
export default GenresService;