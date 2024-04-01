function Match({match}){
    return (
        <div>
            <li key={match.id}>{match.email} - {match.fname} {match.lname}</li>
        </div>
    )
}

export default Match;