import React, {useEffect, useState} from "react";
import userAPI from "../API/userAPI";
import ticketApi from "../API/ticketAPI";
import TokenManager from "../API/TokenManager";
import { useNavigate } from "react-router-dom";

function UserProfile(){
    const claims = TokenManager.getClaimsFromLocalStorage();
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [password, setPassword] = useState("");
    const [boughtTickets, setBoughtTickets] = useState([]);
    const navigate = useNavigate();

    const getUserDetails = () => {
        if (claims?.roles?.some(role => ['ADMIN', "CUSTOMER_SERVICE", "FOOTBALL_FAN"].includes(role)) && claims?.userId) {
          userAPI.getUser(claims.userId)
            .then(data => {
                setUserDetails(data);
                fetchBoughtTickets(claims.userId);
            })
            .catch((e) => {
                console.error("Error retrieving user data: ", e);
                navigate('/unauthorized');

            })
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
                    setBoughtTickets(data)
                })
      }

      useEffect(() => {
        getUserDetails();
      }, []);

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
    };

    return(
        <div className="login-container">
            <h1>User Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="box fName">
                    <label htmlFor="fName">First Name</label>
                        <input type="text" id="fName" value={fname || ''} onChange={handleFNameChange} required autoComplete="fName"/>
                </div>
                <div className="box lName">
                    <label htmlFor="lName">Last Name</label>
                        <input type="text" id="lName" value={lname|| ''} onChange={handleLNameChange} required autoComplete="lName"/>
                </div>
                <div className="box email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email || ''} onChange={handleEmailChange} required autoComplete="username"/>
                </div>
                <div className="box picture">
                    <label htmlFor="picture">Picture</label>
                        <input type="text" id="picture" value={picture || ''} onChange={handlePictureChange} required autoComplete="picture"/>
                </div>
                <div className="box password">
                    <input type="hidden" id="password" value={password || ''} onChange={handlePasswordChange} required autoComplete="current-password"/>
                </div>
                <button type="submit">Update</button>
            </form>
            <div>
                {boughtTickets.length > 0 ? (
                    <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Row</th>
                            <th>Seat</th>
                            <th>Match information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boughtTickets.map((ticket) => {
                            {console.log("Ticket: ", ticket)}
                            return (
                                <tr key={ticket.id}>
                                    <td>{ticket.price}$</td>
                                    <td>{ticket.rowNum}</td>
                                    <td>{ticket.seatNumber}</td>
                                    <td>{ticket.footballMatch.homeTeamName} vs {ticket.footballMatch.awayTeamName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                ) : (
                    <p>No bought tickets</p>
                )}
            </div>
        </div>
    )
}

export default UserProfile;