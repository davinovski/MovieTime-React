import axios from "./axios"

const UsersService = {

    registerUser: (user) => {
        console.log(user);
        return axios.post("/api/users/register", user);
    },

    loginUser: (user) => {
        return axios.post("/api/users/login", user);
    },

    getUser : (email) => {
        return axios.get(`/api/users/${email}`);
    },

    handleAuthentication: (token) => {
        localStorage.setItem("Authorization", token);

    },
    handleUserData : (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
    },

    logoutUser: () => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("userData");
    },
    changeUserInfo : (firstName, lastName, description) => {
        const data = {
            "firstName": firstName,
            "lastName" : lastName,
            "description" : description
        };
        const queryString = require('query-string');
        const formParams = queryString.stringify(data);
        return axios.post("/api/users/changeDetails", formParams);
    },

    changePassword : (oldPassword, newPassword) => {
        const data = {
            "oldPassword" : oldPassword,
            "newPassword" : newPassword
        };
        const queryString = require('query-string');
        const formParams = queryString.stringify(data);
        return axios.post("/api/users/changePassword", formParams);
    },

    changeUserImage : (formData) =>{
        return axios.post("api/images/image", formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },

    addToWatched : (movieId) => {
        return axios.post(`/api/users/watched/${movieId}`)
    },

    isWatched : (movieId) => {
        return axios.get(`/api/users/${movieId}/isWatched`);
    }
};

export default UsersService;