import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import matchAPI from "../API/matchAPI"

function SingleMatchPage(){
    const [match, setMatch] = useState({});
    const {matchId} = useParams();

    var today = new Date();
    var matchDate = new Date(match.date);
    const options = {timeZone: 'Europe/London'};
    const matchDateStr = matchDate.toLocaleDateString('en-US', {...options, weekday:"short", day: 'numeric', month: 'long'});
    const matchTime = matchDate.toLocaleTimeString('en-US', {...options, hour: 'numeric', minute: 'numeric'});

    const buyTicketPath = `/matches/${matchId}/tickets`

    const refreshMatch = () => {
        matchAPI.getMatch(matchId)
            .then((data) =>{
                setMatch(data);
                console.log('Match',match);
            })
            .catch((error)=>
            {
                console.error("Error occured: ", error);
            })
    }

    useEffect(() => {
        refreshMatch();
    }, [matchId]);
    return(
        <div className="single-match-container">
            <div className="match-details">
                <div className="match-info"> 
                    <div>{matchDateStr}</div>
                    <div>{matchTime}</div>
                    <div>{match.venueName} </div>
                </div>
                <hr/>
                <div className="teams-info">
                    <span className="home-team">
                    <div>
                        {match.homeTeamName}

                    </div>
                        <img 
                            className="team-logo" 
                            src={`${match.homeTeamLogo}`}
                            alt={`${match.homeTeamName}`}
                        />
                    </span>
                    {today >= matchDate ? ` ${match.goalsHome} - ${match.goalsAway} ` : " VS "}
                    <span className="away-team">
                        {match.awayTeamName} 
                        <img 
                            className="team-logo" 
                            src={`${match.awayTeamLogo}`}
                            alt={`${match.awayTeamName}`}
                        />
                    </span>
                </div>
                <div className="ticket">
                {today < matchDate ? (
                    <Link to={buyTicketPath} className="buy-ticket-link">
                        Buy Ticket
                    </Link>
                ) : (
                    <span className="ticket-unavailable">Tickets are not longer available</span>
                )}
                </div>
                <div className='match-tickets'>
                    <div className='available-tickets'>
                        Available tickets: {match.availableTicketsCount}
                    </div>
                    {match.availableTicketsCount !== 10 && (
                        <div className='sold-tickets'>
                            Sold tickets: {match.soldTicketCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleMatchPage;