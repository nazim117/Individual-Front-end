import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginCredentials = JSON.stringify({
            email,
            password
        })

        props.onLogin(loginCredentials);
        navigate("/");
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
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required autoComplete="current-password"/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default LoginPage;