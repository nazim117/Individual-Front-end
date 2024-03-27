import axios from "axios";

const userAPI = {
    getUsers : () => axios
        .get("http://localhost:8080/users")
        .then(res => res.data.users)
}

export default userAPI;