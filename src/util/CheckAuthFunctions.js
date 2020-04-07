export const isUserAuth = () => {
    return localStorage.getItem("userData") !== null;
};

export const getUserRole = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(userData !== null) {
        return userData.admin;
    }
    return null;
};