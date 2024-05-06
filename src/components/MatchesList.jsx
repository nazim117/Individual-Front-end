import React from "react"
import Match from "./Match";

function MatchesList({matches}) {

  return (
    <ul>
      {matches.map(match => (
        <Match key={match.id} match={match} />
      ))}
    </ul>
  )
}

export default MatchesList;