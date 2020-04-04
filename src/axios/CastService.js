import axios from "./axios"

const CastService = {
    getAllStars: () => {
        return axios.get("/api/cast", );
    },
    addPerson : (person) =>{
        return axios.post(`api/cast`, person);
    },

    editPerson: (personId, modifiedPerson) => {
        return axios.put(`/api/cast/${personId}`, modifiedPerson);
    },
    getPerson : (personId) => {
        return axios.get(`/api/cast/${personId}`);
    }


};
export default CastService;