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
                console.log("Error occured: ", error);
            })
    }

    useEffect(() => {
        refreshMatch();
    }, [matchId]);
    return(
        <div>
            <div>
                <li className="match-item" key={match.id}> 
                    <span className="match-details">
                        <div className="match-info">
                            <div>{match.date}</div>
                            <div>{match.venueName} </div>
                            <div>{match.statusShort}</div>
                            {" "}
                        </div>
                        <hr></hr>
                        <span className="home-team">
                            {match.homeTeamName} 
                            <img 
                                className="team-logo" 
                                src={`${match.homeTeamLogo}`}
                                alt={`${match.homeTeamName}`}
                            />
                        </span>

                        {`${match.goalsHome} - ${match.goalsAway}`}
                        
                        <span className="away-team">
                            <img 
                                className="team-logo" 
                                src={`${match.awayTeamLogo}`}
                                alt={`${match.awayTeamName}`}
                            />
                            {match.awayTeamName} 
                        </span>
                    </span>
                    <div className="ticket">
                    <Link to={buyTicketPath} style={{textDecoration: 'none', color: 'red'}}>
                        Buy Ticket
                        </Link>
                    </div>
                </li>
            </div>
        </div>
    )
}

export default SingleMatchPage;