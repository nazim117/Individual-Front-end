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
        buyTicket: async (data) => {
            const user = TokenManager.getClaimsFromLocalStorage();

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${baseUrl}/buy-ticket/${user.userId}`,
                headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
                },
                data
              };
              return axios
                .request(config)
                .then((response) => {
                return response.data;
                })
                .catch((error) => {
                  console.log(error);
                  throw error;
                });
        },
        getBoughtTickets: (ticketId) => axios
          .get(`${baseUrl}/users/${ticketId}`,{
              headers:{
                  Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
              }
          }).then(res => {
            console.log("res data: ",res.data)
              return res.data;
          }).catch(error => {
            console.error(error);
            throw error;
          }),
        
}

export default ticketAPI;