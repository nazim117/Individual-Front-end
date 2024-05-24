import {Link} from 'react-router-dom';

function Match({match}){
    var today = new Date();
    var matchDate = new Date(match.date);
    const options = {timeZone: 'Europe/London'};
    const matchDateStr = matchDate.toLocaleDateString('en-US', {...options, weekday:"short", day: 'numeric', month: 'long'});
    const matchTime = matchDate.toLocaleTimeString('en-US', {...options, hour: 'numeric', minute: 'numeric'});

    const matchPagePath = `/matches/${match.id}`;

    return (
        <Link to={matchPagePath} style={{textDecoration: 'none', color: 'red'}}>
            <div className="match-item" key={match.id}>
                <span className="match-details">
                    <div className="match-info">
                        <div>{matchDateStr}</div>
                        <div>{matchTime}</div>
                        <div>{match.venueName}</div>
                    </div>
                    <hr></hr>
                    <span className="home-team">
                        <img 
                            className="team-logo" 
                            src={`${match.homeTeamLogo}`}
                            alt={`${match.homeTeamName}`}
                        />
                    <div>{match.homeTeamName}</div>
                    </span>

                    {today >= matchDate ? ` ${match.goalsHome} - ${match.goalsAway} ` : " VS "}
                    
                    <span className="away-team">
                        <div>{match.awayTeamName}</div>
                        <img 
                            className="team-logo" 
                            src={`${match.awayTeamLogo}`}
                            alt={`${match.awayTeamName}`}
                        />
                    </span>
                </span>
            </div>
        </Link>
    )
}

export default Match;