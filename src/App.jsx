import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import UserPage from './pages/UserPage';
import NavBar from './components/NavBar';
import MatchesPage from './pages/MatchesPage';
import TicketsPage from './pages/TicketsPage';
import Home from './pages/Home';
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import SingleMatchPage from "./pages/SingleMatchPage";
import BuyTicket from "./pages/BuyTicket";
import RegisterPage from "./pages/RegisterPage";
import ThankYouPage from "./pages/ThankYouPage";
import Unautorized from "./pages/Unauthorized";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/matches" element={<MatchesPage/>} />
            <Route path="/tickets" element={<TicketsPage/>} />
            <Route path="/matches/:matchId" element={<SingleMatchPage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/thank-you" element={<ThankYouPage/>}/>
            <Route path="/unauthorized" element={<Unautorized/>}/>
            <Route path="/users" element={<ProtectedRoute element={<UserPage/>} />} />
            <Route path="/matches/:matchId/tickets" element={<ProtectedRoute element={<BuyTicket/>} />}/>
            <Route path="/userProfile" element={<ProtectedRoute element={<UserProfile/>} />} />
          </Routes>
          <Footer/>
        </Router>
      </AuthProvider>
    </div>
);
}

export default App;
