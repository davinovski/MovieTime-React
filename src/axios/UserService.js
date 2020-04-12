import axios from "./axios"

const UsersService = {

    registerUser: (user) => {
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
    }
};

export default UsersService;