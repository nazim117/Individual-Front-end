import { useNavigate } from "react-router-dom";
import TokenManager from "../API/TokenManager";

function NavBar(){
    const claims = TokenManager.getClaimsFromLocalStorage();

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(confirm("Are you sure you want to logout?")){
            handleLogout();
            navigate("/");
        }
    }

    const handleLogout = () => {
        TokenManager.clear();
      }

    return(
        <nav className="navbar navbar-expand-lg custom-style">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src="/Logo.png"/></a>
                <div id="navbarNav">
                    <ul className="navbar-nav">
                        {claims && (claims.roles.includes("ADMIN") || claims.roles.includes("CUSTOMER_SERVICE"))? (
                        <div className="li-elements">
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="/matches">MATCHES</a>
                        </li>
                            <li className="nav-item">
                                <a className="nav-link custom-nav-link" href="/users">USERS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link custom-nav-link" href="/tickets">TICKETS</a>
                            </li>
                        </div>
                        ):(
                        <div className="li-elements">
                            <li className="nav-item">
                                <a className="nav-link custom-nav-link" href="/matches">MATCHES</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link custom-nav-link" href="/rankings">RANKINGS</a>
                            </li>
                        </div>
                        )}
                    </ul>
                </div>
                    {claims?(
                        <div className="logged-user">
                            <div className='login'>
                                <a href="/userProfile"><i className="fa fa-user" aria-hidden="true"></i> USER PROFILE</a>
                            </div>
                            <div className='login'>
                                <form className="logout" onSubmit={handleSubmit}>
                                    <button type="submit">LOGOUT</button>
                                </form>
                            </div>
                        </div>
                    ):(
                        <div className='login'>
                            <a href="/login">LOGIN</a>
                        </div>
                    )}
            </div>
        </nav>
    )
}

export default NavBar;