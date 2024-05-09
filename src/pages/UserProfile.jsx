import React, {useEffect, useState} from "react";
import userAPI from "../API/userAPI";
import ticketApi from "../API/ticketAPI";
import TokenManager from "../API/TokenManager";

function UserProfile(){
    const claims = TokenManager.getClaimsFromLocalStorage();
    const [fname, setFName] = useState(null);
    const [lname, setLName] = useState(null);
    const [email, setEmail] = useState(null);
    const [picture, setPicture] = useState(null);
    const [password, setPassword] = useState(null);
    const [boughtTickets, setBoughtTickets] = useState([]);

    const getUserDetails = () => {
        if (claims?.roles?.some(role => ['ADMIN', "CUSTOMER_SERVICE", "FOOTBALL_FAN"].includes(role)) && claims?.userId) {
          userAPI.getUser(claims.userId)
            .then(data => {
                setUserDetails(data);
                fetchBoughtTickets(claims.userId);
            })
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

      const fetchBoughtTickets = (userId) => {
        ticketApi.getBoughtTickets(userId)
                .then(data => {
                    console.log("Bought tickets data",data)
                    setBoughtTickets(data)
                })
                .catch(error => console.error(error))
      }

      useEffect(() => {
        getUserDetails();
      }, [claims]);

      console.log("Purchased ticekts: ", boughtTickets);

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

            <div>
                <h2>Bought Tickets</h2>
                <ul>
                    {boughtTickets.map((ticket) => {
                        {console.log("Ticket: ", ticket)}
                        return (
                            <li key={ticket.id}>
                                <h3>Price: {ticket.price}$</h3>
                                <h3>Row number: {ticket.rowNum}</h3>
                                <h3>Seat number: {ticket.seatNumber}</h3>
                                <h3>Match information: {ticket.footballMatch.homeTeamName} vs {ticket.footballMatch.awayTeamName}</h3>
                                <br></br>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default UserProfile;