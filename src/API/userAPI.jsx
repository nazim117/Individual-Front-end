import axios from "axios";
import TokenManager from "./TokenManager";
import baseUrl from "../utils/baseUrl";

const userUrl = baseUrl.users;

const userAPI = {
  getUsers : () => axios
      .get(userUrl,
        {
          headers: { 
            Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
          }
        })
      .then(res => res.data.users)
      .catch(error => {
        console.error("Error getting users: ", error);
        throw error;
      }),
      
  getUser : async (id) =>{
    try{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${userUrl}/${id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        },
      };
      
      const response = await axios.request(config);
      return response.data;
    }catch(error) {
      console.error("Error getting user: ", error);
      throw error;
    }
  },

  searchUser: async (searchString) => { axios
    try{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${userUrl}/search`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        },
        params: {searchString}
      };
      
      const response = await axios.request(config);
      console.log(response.data);
      return response.data.users;
    }catch(error) {
      console.error("Error getting user: ", error);
      throw error;
    }
  },

  post: async (data) => {
    try{
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: userUrl,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        },
        data
      };
      const response = await axios.request(config);
      return response.data;
    }catch(error ){
      console.error("Error posting user: ", error);
      return error;
    };
  },

  edit: async (id, data) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${userUrl}/${id}`,
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
      console.error("Error editing user: ", error);
    });
  },

  delete: async (id) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${userUrl}/${id}`,
      headers: {
        Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
       },
    };
    
    axios.request(config)
    .then(() => {
      console.log("User was deleted");
      return;
    })
    .catch((error) => {
      console.error("Error deleting user: ", error);
    });
  },
}

export default userAPI;