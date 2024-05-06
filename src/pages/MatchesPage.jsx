import React, {useEffect, useState} from "react";
import matchAPI from "../API/matchAPI"
import MatchList from "../components/MatchesList";

function MatchesPage(){
    const [matches, setMatches] = useState([]);

    const refreshMatches = () => {
        matchAPI.getMatches()
            .then((data) =>{
                console.log(data);
                setMatches(data);
            })
            .catch((error)=>
            {
                console.log("Error occured: ", error)
            })
    }

    useEffect(() => {
        refreshMatches();
    }, []);

    return(
        <div className="matches-container">
            <h1 className="matches-header">Matches</h1>
            <MatchList matches={matches}/>
        </div>
    )
}
export default MatchesPage;