import axios from "axios";
import TokenManager from "./TokenManager";

const baseUrl = `http://localhost:8080/tokens`;

const loginAPI = {
    login: async (credentials) => {
      try{
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: baseUrl,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : credentials
        };
        
        const response = await axios.request(config);
        const accessToken = response.data.accessToken;
        console.log(accessToken);
        TokenManager.setAccessTokenToLocalStorage(accessToken);
        return TokenManager.setAccessToken(accessToken)
      }catch(error) {
        console.log(error);
        throw error;
      }
    },
    register: async(user) => {
      try{
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${baseUrl}/register`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : user
        };
        
        const response = await axios.request(config);
        const accessToken = response.data.accessToken;
        console.log(accessToken);
        TokenManager.setAccessTokenToLocalStorage(accessToken);
        return TokenManager.setAccessToken(accessToken)
      }catch(error) {
        console.log(error);
        throw error;
      }
    }
}

export default loginAPI;