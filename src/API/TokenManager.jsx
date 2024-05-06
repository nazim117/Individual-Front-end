import {jwtDecode} from "jwt-decode";
import { json } from "react-router-dom";

const userData = {
    accessToken: undefined,
    claims: undefined
}

const TokenManager = {
    getAccessToken: () => {
        console.log("Userdata: ", userData.accessToken)
        return userData.accessToken
    },
    getClaims: () => {
        if (!userData.claims) {
            return undefined;
        }
        console.log('userData.claims', userData.claims);
        return userData.claims;
    },
    setAccessToken: (token) => {
        userData.accessToken = token;
        console.log('AccessToken', userData.accessToken)
        const claims = jwtDecode(token);
        userData.claims = claims;
        console.log('Claims: ',userData.claims)
        console.log('returns back to loginapi')
        return userData.claims;
    },
    getClaimsFromLocalStorage: () => {
        const storedClaims = localStorage.getItem('claims');
        return storedClaims ? JSON.parse(storedClaims) : null;
    },
    setClaimsToLocalStorage: (claims) => {
        localStorage.setItem('claims', JSON.stringify(claims));
    },
    getAccessTokenFromLocalStorage: () => {
        const storedAccessToken = localStorage.getItem('accessToken');
        console.log("Stored accesstoken", storedAccessToken)
        return storedAccessToken ? JSON.parse(storedAccessToken) : null;
    },
    setAccessTokenToLocalStorage: (token) => {
        localStorage.setItem('accessToken', JSON.stringify(token));
    },
    clear: () => {
        localStorage.removeItem('claims');
        localStorage.removeItem('accessToken');
        userData.accessToken = undefined;
        userData.claims = undefined;
    }
}

export default TokenManager;