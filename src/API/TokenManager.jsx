import {jwtDecode} from "jwt-decode";

const userData = {
    accessToken: undefined,
    claims: undefined
}

const TokenManager = {
    getAccessToken: () => {
        return userData.accessToken
    },
    getClaims: () => {
        if (!userData.claims) {
            return undefined;
        }
        return userData.claims;
    },
    setAccessToken: (token) => {
        userData.accessToken = token;
        const claims = jwtDecode(token);
        userData.claims = claims;
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