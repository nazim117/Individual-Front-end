import { useNavigate } from "react-router-dom";


function ThankYouPage(){
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate("/");
    }
    return(
        <div className="thank-you-container">
            <h2 className="thank-you-header">Thank you for your purchase!</h2>
            <p className="thank-you-paragraph">We sent you an email with the match details</p>
            <p className="thank-you-paragraph">Enjoy the game!</p>
            <button className="thank-you-button" onClick={navigateToHomePage}>Home</button>
        </div>
    )
}

export default ThankYouPage;