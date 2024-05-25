import { useNavigate } from "react-router-dom";

function TicketsPage(){
    const navigate = useNavigate();
    navigate('/unauthorized');
    return(
        <div>
            TicketsPage
        </div>
    )
}

export default TicketsPage;