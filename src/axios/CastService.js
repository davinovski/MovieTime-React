import axios from "./axios"

const CastService = {
    getAllStars: () => {
        return axios.get("/api/cast", );
    },
    addPerson : (person) =>{
        return axios.post(`api/cast`, person);
    },
    getAllStarsPaged: (pageNumber, pageSize, params) => {
        params.set("pageNumber", pageNumber);
        params.set("pageSize", pageSize);
        return axios.get("/api/cast/paged", {params: params});
    },

    editPerson: (personId, modifiedPerson) => {
        return axios.put(`/api/cast/${personId}`, modifiedPerson);
    },
    getPerson : (personId) => {
        return axios.get(`/api/cast/${personId}`);
    },
    deleteCast : (personId) => {
        return axios.delete(`/api/cast/delete/${personId}`);
    }


};
export default CastService;