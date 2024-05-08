import React, {useEffect, useState} from "react";
import userAPI from "../API/userAPI";

function UserProfile({claims}){
    const [fname, setFName] = useState(null);
    const [lname, setLName] = useState(null);
    const [email, setEmail] = useState(null);
    const [picture, setPicture] = useState(null);
    const [password, setPassword] = useState(null);

    const getUserDetails = () => {
        if (claims?.roles?.includes('ADMIN') && claims?.userId) {
          userAPI.getUser(claims.userId)
            .then(data => setUserDetails(data))
            .catch(error => console.error(error));
        }
      }

      const setUserDetails = (data) => {
        const { fname, lname, email, picture, password} = data;
            setFName(fname);
            setLName(lname);
            setEmail(email);
            setPicture(picture);
            setPassword(password);
      }

      useEffect(() => {
        getUserDetails();
      }, [claims]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const userCredentials = JSON.stringify({
            fname,
            lname,
            email,
            picture,
            password,
        })

        userAPI.edit(claims.userId, userCredentials)
        .then(() => {
            alert("Edit was successful");
        })
        .catch(() => {
            console.log("error editing user");
        })
    };

    return(
        <div>
        <h1>User Profile</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fName">First Name: </label>
                    <input type="text" id="fName" value={fname || ''} onChange={handleFNameChange} required autoComplete="fName"/>
            </div>
            <div>
                <label htmlFor="lName">Last Name: </label>
                    <input type="text" id="lName" value={lname|| ''} onChange={handleLNameChange} required autoComplete="lName"/>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" value={email || ''} onChange={handleEmailChange} required autoComplete="username"/>
            </div>
            <div>
                <label htmlFor="picture">Picture: </label>
                    <input type="text" id="picture" value={picture || ''} onChange={handlePictureChange} required autoComplete="picture"/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password || ''} onChange={handlePasswordChange} required autoComplete="current-password"/>
            </div>
            <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UserProfile;