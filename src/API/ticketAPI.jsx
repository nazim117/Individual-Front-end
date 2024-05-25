import axios from "axios";
import TokenManager from "./TokenManager";
import baseUrl from "../utils/baseUrl";

const ticketUrl = baseUrl.tickets;

const ticketAPI = {
  getTickets : () => axios
    .get(ticketUrl)
    .then(res => res.data.matches)
    .catch(error => {
      console.error("Error getting tickets: ", error);
      throw error;
    }),

  getTicketsByMatchId : (id) => axios
    .get(`${ticketUrl}/matches/${id}`,{
        headers:{
            Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        }
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
      console.error("Error getting tickets by match Id: ", error);
      throw error;
    }),

  buyTicket: async (data) => {
    const user = TokenManager.getClaimsFromLocalStorage();

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${ticketUrl}/buy-ticket/${user.userId}`,
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
          console.error("Error purchasing a ticket: ", error);
          throw error;
        });
  },

  getBoughtTickets: (ticketId) => axios
    .get(`${ticketUrl}/users/${ticketId}`,{
        headers:{
            Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        }
    }).then(res => {
        return res.data;
    }).catch(error => {
      console.error("Error getting bought tickets: ", error);
      throw error;
    }),
}

export default ticketAPI;