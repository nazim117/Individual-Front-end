import React, {useEffect, useState} from "react";
import matchAPI from "../API/matchAPI"
import MatchList from "../components/MatchesList";

function Home(){
    const [matches, setMatches] = useState([]);

    const refreshMatches = () => {
        matchAPI.getTop3Matches()
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
        <div className="favoured-matches">
            <MatchList matches={matches}/>
        </div>
    )
}

export default Home;