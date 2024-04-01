function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg custom-style">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src="/Logo.png"/></a>
                <div id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="/matches">MATCHES</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="#">GROUPS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link custom-nav-link" href="#">TEAMS</a>
                        </li>
                    </ul>
                </div>
                    <div className='login'>
                        <a href="/LoginPage"><i class="fa fa-user" aria-hidden="true"></i> LOGIN</a>
                    </div>
            </div>
        </nav>
    )
}

export default NavBar;