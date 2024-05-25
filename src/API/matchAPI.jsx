import axios from "axios";
import baseUrl from "../utils/baseUrl";

const matchesUrl = baseUrl.matches;

const matchAPI = {
    getMatchesDescDate : () => axios
        .get(`${matchesUrl}/descending`)
        .then(res => res.data.matches)
        .catch(error => {
            console.error("Error getting matches in a descending order: ", error);
            throw error;
        }),

    getMatchesAscDate : () => axios
        .get(`${matchesUrl}/ascending`)
        .then(res => res.data.matches)
        .catch(error => {
            console.error("Error getting matches in a asceding order: ", error);
            throw error;
        }),

    getMatchesByMostSold : () => axios
        .get(`${matchesUrl}/most-sold`)
        .then(res => res.data.matches)
        .catch(error => {
            console.error("Error getting matches by sold tickets: ", error);
            throw error;
        }),
        
    getTop6Matches : () => axios
    .get(`${matchesUrl}/upcoming`)
    .then(res => res.data.matches)
    .catch(error => {
        console.error("Error getting top 6 matches: ", error);
        throw error;
    }),

    getMatch : (id) => axios
        .get(`${matchesUrl}/${id}`)
        .then(res => {return res.data;})
        .catch(error => {
            console.error("Error getting match: ", error);
            throw error;
        }),
}

export default matchAPI;