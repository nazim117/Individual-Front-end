import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import React, { useState} from 'react';
import UserPage from './pages/UserPage';
import NavBar from './components/NavBar';
import MatchesPage from './pages/MatchesPage';
import TicketsPage from './pages/TicketsPage';
import Home from './pages/Home';
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import TokenManager from "./API/TokenManager";
import loginAPI from "./API/loginAPI";

function App() {

  const [claims, setClaims] = useState(() => {
    const storedClaims = TokenManager.getClaimsFromLocalStorage();
    return storedClaims || TokenManager.getClaims();
  });

  const handleLogin = async (credentials) => {
    try{
        const newClaims = await loginAPI.login(credentials);
        setClaims(newClaims);
        TokenManager.setClaimsToLocalStorage(newClaims);
    } catch(error){
      console.log(error);
    }
    
  }

  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
    setUserDetails(null);
  }

  return (
    <div className="App">
      <Router>
        <NavBar claims={claims} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/matches" element={<MatchesPage/>} />
          <Route path="/tickets" element={<TicketsPage/>} />
          <Route path="/users" element={<UserPage/>} />
          <Route path="/userProfile" element={<UserProfile claims = {claims}/>} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin}/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
);
}

export default App;
