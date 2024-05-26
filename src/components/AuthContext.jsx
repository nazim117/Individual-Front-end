import { createContext, useContext, useState } from "react";
import TokenManager from "../API/TokenManager";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!TokenManager.getClaimsFromLocalStorage());

    const login = () => {
        setIsAuthenticated(true);
    }
    const logout = () => {
        TokenManager.clear();
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}