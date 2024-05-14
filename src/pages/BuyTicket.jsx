import { useParams, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import ticketAPI from "../API/ticketAPI";
import TokenManager from "../API/TokenManager";

function BuyTicket(){
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState({});

    const {matchId} = useParams();
    const [row, setRow] = useState(1);
    const [seat, setSeat] = useState(1);
    const navigate = useNavigate();

    const token = TokenManager.getAccessTokenFromLocalStorage();

    const refreshTicket = () => {
        ticketAPI.getTicketsByMatchId(matchId)
            .then((data) =>{
                setTickets(data);
            })
            .catch((error)=>
            {
                console.log("Error occured: ", error)
            })
    }

    const handleRow = (e) => {
        const selectedRow = e.target.value;
        setRow(selectedRow);
        handlePrice(selectedRow, seat);
    }

    const handleSeat = (e) => {
        const selectedSeat = e.target.value;
        setSeat(selectedSeat);
        handlePrice(row, selectedSeat);
    }

    const handlePrice = (row, seat) => {
        var ticket = tickets.find(ticket => ticket.rowNum == row && ticket.seatNumber == seat);
        setSelectedTicket(ticket);
    }

    const handlePurchase = () => {
        ticketAPI.buyTicket(selectedTicket.id);
    }

    useEffect(() => {
        if(!token){
            alert("You need to log in to purchase a ticket")
            return navigate(-1);
        }
        const claims = TokenManager.getClaimsFromLocalStorage();
        console.log("token: ", claims);
        if(!claims.roles.includes("FOOTBALL_FAN")){
            alert("Login as a football fan to purchase ticket");
            return navigate(-1);

        }
        refreshTicket();
        handlePrice(row, seat);
    }, [matchId]);

    const rows = [...new Set(tickets.map(ticket => ticket.rowNum))];
    const seats = [...new Set(tickets.map(ticket => ticket.seatNumber))];

    return(
        <div className="match-container">
            <h2>Buy Ticket</h2>
            <div className="input-conainer">
                <label htmlFor="row-number">Row Number</label>
                <select name="row-number" id="row-number" value={row} onChange={handleRow}>
                    {rows.map((row, index) => {
                        return(
                            <option key={index} value={row}>
                                {row}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="seat-number">Seat Number</label>
                <select name="seat-number" id="seat-number" value={seat} onChange={handleSeat}>
                    {seats.map((seat, index) => {
                        return(
                            <option key={index} value={seat}>
                                {seat}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="price-container">
                <label>{selectedTicket ? `Price: ${selectedTicket.price}$` : "Select row and seat"}</label>
            </div>
            <button className="buy-ticket-button" onClick={handlePurchase}>Buy Ticket</button>
        </div>
    )
}

export default BuyTicket;