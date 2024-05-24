import React, {useEffect, useState} from "react";
import matchAPI from "../API/matchAPI"
import MatchList from "../components/MatchesList";
import ChatButton from "../components/ChatButton";
import ChatPopup from "../components/ChatPopup";

function Home(){
    const [matches, setMatches] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const refreshMatches = () => {
        matchAPI.getTop3Matches()
            .then((data) =>{
                console.log(data);
                setMatches(data);
            })
            .catch((error)=>
            {
                console.error("Error occured: ", error)
            })
    }

    useEffect(() => {
        refreshMatches();
    }, []);

    const handleChatButtonClick = () => {
        setIsChatOpen(!isChatOpen);
    }

    const handleCloseChat = () => {
        setIsChatOpen(false);
    }

    return(
        <div className="home">
            <div className="favoured-matches">
                <MatchList matches={matches}/>
            </div>
            <ChatButton onClick={handleChatButtonClick}/>
            {isChatOpen && <ChatPopup onClose={handleCloseChat}/>}
        </div>
    )
}

export default Home;