import axios from "axios";

const baseUrl = "http://localhost:8080/matches";

const matchAPI = {
    getMatches : () => axios
        .get(baseUrl)
        .then(res => res.data.matches),
    getTop3Matches : () => axios
    .get(`${baseUrl}/upcoming`)
    .then(res => res.data.matches),
    getMatch : (id) => axios
        .get(`${baseUrl}/${id}`)
        .then(res => {
            return res.data;
        })
}

export default matchAPI;