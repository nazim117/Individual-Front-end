
function Ticket({ticket}){

    return (
        <option value={ticket.id}> 
            {ticket.seatNumber}
        </option>
    )
}

export default Ticket;