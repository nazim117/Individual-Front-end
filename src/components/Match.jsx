import {Link} from 'react-router-dom';

function Match({match}){
    var today = new Date();
    var matchDate = new Date(match.date);
    const options = {timeZone: 'Europe/London'};
    const matchDateStr = matchDate.toLocaleDateString('en-US', {...options, weekday:"short", day: 'numeric', month: 'long'});
    const matchTime = matchDate.toLocaleTimeString('en-US', {...options, hour: 'numeric', minute: 'numeric'});

    const matchPagePath = `/matches/${match.id}`;

    return (
        <Link to={matchPagePath} className='match-link'>
            <div className="match-item" key={match.id}>
                <span className="match-details">
                    <div className="match-info">
                        <div className='match-date'>{matchDateStr}</div>
                        <div className='match-time'>{matchTime}</div>
                        <div className='match-venue'>{match.venueName}</div>
                    </div>
                    <hr/>
                    <div className='head-to-head'>
                        <span className="home-team">
                            <div className='team-name'>{match.homeTeamName}</div>
                            <img 
                                className="team-logo" 
                                src={`${match.homeTeamLogo}`}
                                alt={`${match.homeTeamName}`}
                            />
                        </span>
                        <div className='match-score'>
                            {today >= matchDate ? ` ${match.goalsHome} - ${match.goalsAway} ` : " VS "}
                        </div>
                        <span className="away-team">
                            <div className='team-name'>{match.awayTeamName}</div>
                            <img 
                                className="team-logo" 
                                src={`${match.awayTeamLogo}`}
                                alt={`${match.awayTeamName}`}
                            />
                        </span>
                    </div>
                </span>
            </div>
        </Link>
    )
}

export default Match;