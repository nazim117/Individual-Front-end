import axios from "axios";

const matchAPI = {
    getMatches : () => axios
        .get("http://localhost:8080/matches")
        .then(res => res.data.matches)
}

export default matchAPI;