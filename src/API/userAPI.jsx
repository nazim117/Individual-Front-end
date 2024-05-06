import axios from "axios";
import TokenManager from "./TokenManager";

const baseUrl = "http://localhost:8080/users";

const userAPI = {
    getUsers : () => axios
        .get(baseUrl,
          {
            headers: { 
              Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
            }
          })
        .then(res => res.data.users),
    getUser : async (id) =>{
    try{
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseUrl}/${id}`,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        },
      };
      
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    }catch(error) {
      console.log(error);
      throw error;
    }
  },
  post: async (data) => {
    try{
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
        },
        data
      };
      console.log("Config file: ", config);
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      return response.data;
    }catch(error ){
      console.log(error);
      return error;
    };
  },
  edit: async (id, data) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseUrl}/${id}`,
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TokenManager.getAccessTokenFromLocalStorage()}`,
      },
      data
    };
    console.log("Edit config file: ", config);
    axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  delete: async (id) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${baseUrl}/${id}`,
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
      console.log(error);
    });
  }
}

export default userAPI;