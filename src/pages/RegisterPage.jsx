import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import loginAPI from "../API/loginAPI";
import TokenManager from "../API/TokenManager";

function RegisterPage() {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}

    const handleFNameChange = (e) => {
        setFName(e.target.value);
    }

    const handleLNameChange = (e) => {
        setLName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePictureChange = (e) => {
        setPicture(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleCreateUser = (e) => {
        e.preventDefault();

        if(!fName || !lName || !email){
            alert("Fill in all required fields");
            return;
        }

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        let newUser = JSON.stringify({
            email,
            fname: fName,
            lname: lName,
            picture,
            password,
        });

        loginAPI.register(newUser)
        .then((newClaims) => {
            TokenManager.setClaimsToLocalStorage(newClaims);
            console.log("New claims: ", newClaims)
            if(newClaims){
                navigate("/");
            }
        })
        .catch((error) => {
            console.error("Error fetching items ", error)
        })

    }
    return(
        <div className="login-container">
            <h1>Register</h1>
            <form onSubmit={handleCreateUser}>
                <div className="box fName">
                    <label htmlFor="fName">First Name</label>
                        <input type="text" id="fName" name="fName" value={fName} onChange={handleFNameChange} required autoComplete="given-name"/>
                </div>
                <div className="box lName">
                    <label htmlFor="lName">Last Name</label>
                        <input type="text" id="lName" name="lname" value={lName} onChange={handleLNameChange} required autoComplete="family-name"/>
                </div>
                <div className="box email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required autoComplete="email"/>
                </div>
                <div className="box picture">
                    <label htmlFor="picture">Picture</label>
                        <input type="text" id="picture" name="picture" value={picture} onChange={handlePictureChange} autoComplete="picture"/>
                </div>
                <div className="box password">
                    <label htmlFor="password">Password</label>
                    <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    required autoComplete="new-password"/>
                </div>
                <div className="box confirm-password">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                    type={showPassword ? "text" : "password"} 
                    id="confirm-password" 
                    name="confirm-password" 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                    required autoComplete="new-password"/>
                </div>

                <button className="toggle-password" type="button" onClick={togglePasswordVisibility}>
                    <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                    {showPassword? "Hide password" : "Show password"}
                </button>

                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterPage;