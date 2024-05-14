import React from "react"
import Match from "./Match";

function MatchesList({matches}) {

  return (
    <div className="matches-list">
      {matches.map(match => (
        <Match key={match.id} match={match} />
      ))}
    </div>
  )
}

export default MatchesList;