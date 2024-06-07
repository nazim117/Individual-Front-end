import React from "react"
import Match from "./Match";

function MatchesList({matches}) {
  if (!matches || matches.length === 0) {
    return <div>No matches available</div>;
  }
  return (
    <div className="matches-list">
      {matches.map(match => (
        <Match key={match.id} match={match} />
      ))}
    </div>
  )
}

export default MatchesList;