import axios from "./axios"
import qs from "querystring";

const CommentService = {
    postComment: (movieId,title,content, stars) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const data = {
            "title":title,
            "content":content,
            "stars":stars,
            "email": userData.username
        };
        const formParams = qs.stringify(data);
        return axios.post(`/api/movies/${movieId}/comments/add`, formParams)
    },

    getComments: (movieId) => {
        return axios.get(`api/movies/${movieId}/comments`);
    }

};
export default CommentService;