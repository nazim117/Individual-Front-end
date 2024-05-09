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
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

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
        <div>
        <h1>RegisterPage</h1>
            <form onSubmit={handleCreateUser}>
                <div>
                    <label htmlFor="fName">First Name: </label>
                        <input type="text" id="fName" name="fName" value={fName} onChange={handleFNameChange} required autoComplete="given-name"/>
                </div>
                <div>
                    <label htmlFor="lName">Last Name: </label>
                        <input type="text" id="lName" name="lname" value={lName} onChange={handleLNameChange} required autoComplete="family-name"/>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required autoComplete="email"/>
                </div>
                <div>
                    <label htmlFor="picture">Picture: </label>
                        <input type="text" id="picture" name="picture" value={picture} onChange={handlePictureChange} autoComplete="picture"/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required autoComplete="new-password"/>
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password: </label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} required autoComplete="new-password"/>
                </div>

                <button type="submit">Create USer</button>
            </form>
        </div>
    )
}

export default RegisterPage;