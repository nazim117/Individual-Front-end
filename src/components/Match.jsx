import {Link} from 'react-router-dom';

function Match({match}){
    var today = new Date();
    var matchDate = new Date(match.date);

    const matchPagePath = `/matches/${match.id}`;

    return (
        <Link to={matchPagePath} style={{textDecoration: 'none', color: 'red'}}>
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

                        {today >= matchDate ? `${match.goalsHome} - ${match.goalsAway}` : " VS "}
                        
                        <span className="away-team">
                            <img 
                                className="team-logo" 
                                src={`${match.awayTeamLogo}`}
                                alt={`${match.awayTeamName}`}
                            />
                            {match.awayTeamName} 
                        </span>
                    </span>
                </li>
            </div>
        </Link>
    )
}

export default Match;