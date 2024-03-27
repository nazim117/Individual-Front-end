import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserPage from './pages/UserPage';
import NavBar from './components/NavBar';
import MatchesPage from './pages/MatchesPage';
import TicketsPage from './pages/TicketsPage';
import Home from './pages/Home';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/matches" element={<MatchesPage/>} />
          <Route path="/tickets" element={<TicketsPage/>} />
          <Route path="/users" element={<UserPage/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
);
}

export default App;
