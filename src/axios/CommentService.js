import axios from "./axios"
import qs from "querystring";

const CommentService = {
    postComment: (movieId,title,content, stars) => {
        console.log(stars);
        const data = {
            "title":title,
            "content":content,
            "stars":stars
        };
        const formParams = qs.stringify(data);
        return axios.post(`/api/movies/${movieId}/comments/add`, formParams)
    },

    getComments: (movieId) => {
        return axios.get(`api/movies/${movieId}/comments`);
    }

};
export default CommentService;