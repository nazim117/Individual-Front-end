import './App.css';
import Header from "./Pages/Components/Header";
import Footer from "./Pages/Components/Footer";
import Home from "./Pages/HomePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MatchesPage from "./Pages/MatchesPage";
import TicketsPage from "./Pages/TicketsPage";
import UsersPage from "./Pages/UserPage";
import {useEffect, useState} from "react";
import axios from "axios";
function App() {
  const [users, setUsers] = useState([]);

  const newUser = async () => {
    axios.get("http://localhost:8080/users")
        .then(res => {
          console.log(res.data.users);
          setUsers(res.data.users);
        })
        .catch((error)=>
        {
          console.log("Error occured: ", error)
        })
  }

  useEffect(() => {
    newUser();
  }, []);

  return (
      <div className="App">
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/matches" element={<MatchesPage/>} />
            <Route path="/tickets" element={<TicketsPage/>} />
            <Route path="/users" element={<UsersPage users={users}/>} />
          </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
