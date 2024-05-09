import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenManager from "../API/TokenManager";
import loginAPI from "../API/loginAPI";

function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (credentials) => {
        try{
            const newClaims = await loginAPI.login(credentials);
            TokenManager.setClaimsToLocalStorage(newClaims);
            console.log("New claims: ", newClaims)
            if(newClaims){
                navigate("/");
            }
        } catch(error){
            console.log(error);
            alert("Invalid credentials. Check your email and password");
            return;
        }
        
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const loginCredentials = JSON.stringify({
                email,
                password
            })
            handleLogin(loginCredentials);

        }catch(error){
            console.log("Error logging in: ", error);
        }

    };
    
    return(
        <div>
            <h1>LoginPage</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required autoComplete="username"/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required autoComplete="current-password"
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default LoginPage;