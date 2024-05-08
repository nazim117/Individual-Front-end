import React from "react"
import Ticket from "./Ticket";

function TicketList({tickets}) {

  return (
    <select>
      {tickets.map((ticket, index) => (
        <Ticket key={index} ticket={ticket} />
      ))}
    </select>
  )
}

export default TicketList;