import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import matchAPI from "../API/matchAPI"

function SingleMatchPage(){
    const [match, setMatch] = useState({});
    const {matchId} = useParams();

    const buyTicketPath = `/matches/${matchId}/tickets`

    const refreshMatch = () => {
        matchAPI.getMatch(matchId)
            .then((data) =>{
                setMatch(data);
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
                    <div>{match.date}</div>
                    <div>{match.venueName} </div>
                    <div>{match.statusShort}</div>
                </div>
                <hr/>
                <div className="teams-info">
                    <span className="home-team">
                        {match.homeTeamName} 
                        <img 
                            className="team-logo" 
                            src={`${match.homeTeamLogo}`}
                            alt={`${match.homeTeamName}`}
                        />
                    </span>
                    <span className="score">
                        {`${match.goalsHome} - ${match.goalsAway}`}
                    </span>
                    
                    <span className="away-team">
                        <img 
                            className="team-logo" 
                            src={`${match.awayTeamLogo}`}
                            alt={`${match.awayTeamName}`}
                        />
                        {match.awayTeamName} 
                    </span>
                </div>
                <div className="ticket">
                    <Link to={buyTicketPath} className="buy-ticket-link">
                        Buy Ticket
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SingleMatchPage;