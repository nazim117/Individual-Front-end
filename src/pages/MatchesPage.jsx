import React, {useEffect, useState} from "react";
import matchAPI from "../API/matchAPI"
import MatchList from "../components/MatchesList";

function MatchesPage(){
    const [matches, setMatches] = useState([]);
    const [sortOrder, setSortOrder] = useState("DESC");

    const refreshMatches = (order = 'DESC') => {
        let fetchMatches;
        if(order === 'MOST-SOLD-TICKETS'){
            fetchMatches = matchAPI.getMatchesByMostSold;
        }else if(order === 'ASC'){
            fetchMatches = matchAPI.getMatchesAscDate;
        }else{
            fetchMatches = matchAPI.getMatchesDescDate;
        }

        fetchMatches()
            .then((data) =>{
                setMatches(data);
            })
            .catch((error) => console.error("Error occured: ", error))
    }

    useEffect(() => {
        refreshMatches(sortOrder);
    }, [sortOrder]);

    const handleSortChange = (e) => {
        const selectedOrder = e.target.value;
        setSortOrder(selectedOrder);
    }

    return(
        <div className="matches-container">
        <label htmlFor="sortOrder">Sort by</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="ASC">Latest Date</option>
            <option value="DESC">Oldest Date</option>
            <option value="MOST-SOLD-TICKETS">Sold Tickets</option>
        </select>
            <MatchList matches={matches}/>
        </div>
    )
}
export default MatchesPage;