import axios from "axios";
import TokenManager from "./TokenManager";

const baseUrl = "http://localhost:8080/tickets";

const ticketAPI = {
    getTickets : () => axios
        .get(baseUrl)
        .then(res => res.data.matches),
    getTicketsByMatchId : (id) => axios
        .get(`${baseUrl}/matches/${id}`,{
            headers:{
                Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
            }
        })
        .then(res => {
            return res.data;
        }),
        buyTicket: (data) => {
            const userId = TokenManager.getClaims();
            console.log("USer id token: ", userId);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseUrl}/buy-ticket/${userId}`,
                headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
                },
                data
              };
              axios.request(config)
              .then((response) => {
                return response.data;
              })
              .catch((error) => {
                console.log(error);
              });
        }
}

export default ticketAPI;