import axios from "axios";
import baseUrl from "../utils/baseUrl";

const matchesUrl = baseUrl.matches;

const matchAPI = {
    getMatchesDescDate : () => axios
        .get(`${matchesUrl}/descending`)
        .then(res => res.data.matches),

    getMatchesAscDate : () => axios
        .get(`${matchesUrl}/ascending`)
        .then(res => res.data.matches),

    getMatchesByMostSold : () => axios
        .get(`${matchesUrl}/most-sold`)
        .then(res => res.data.matches),
        
    getTop3Matches : () => axios
    .get(`${matchesUrl}/upcoming`)
    .then(res => res.data.matches),

    getMatch : (id) => axios
        .get(`${matchesUrl}/${id}`)
        .then(res => {return res.data;})
}

export default matchAPI;