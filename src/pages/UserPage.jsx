import React, {useEffect, useState} from "react";
import userAPI from "../API/userAPI"
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";

function UsersPage(){
    const [users, setUsers] = useState([]);
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [role, setRole] = useState("FOOTBALL_FAN");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const refreshUsers = () => {
        userAPI.getUsers()
            .then((data) =>{
                setUsers(data);
            })
            .catch((error)=>
            {
                console.error("Error occured: ", error);
                navigate('/unauthorized');
            })
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        userAPI.searchUser(searchQuery)
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            console.error("Error occured: ", error)
            navigate('/unauthorized');
        })
    }

    const handleFNameChange = (e) => {
        setFName(e.target.value);
    }

    const handleLNameChange = (e) => {
        setLName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePictureChange = (e) => {
        setPicture(e.target.value);
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleCreateUser = (e) => {
        e.preventDefault();

        if(!fname || !lname || !email || !role){
            alert("Fill in all required fields");
            return;
        }

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        let newUser = JSON.stringify({
            email,
            fname,
            lname,
            picture,
            role,
            password,
        });
 
        userAPI.post(newUser)
            .then(() => { 
                refreshUsers();
            })

    }

    const handleDeleteUser = (userId) => {
        userAPI.delete(userId)
        .then(() => {
            refreshUsers();
        })
    }

    useEffect(() => {
        refreshUsers();
    }, []);

    return(
        <div>
            <h1>User Page</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            <div>
                <UserList users={users} handleDeleteUser={handleDeleteUser}/>
            </div>

            <form className="login-container" onSubmit={handleCreateUser}>
                <div className="box fName">
                    <label htmlFor="fName">First Name</label>
                        <input type="text" id="fName" name="fName" value={fname} onChange={handleFNameChange} required autoComplete="given-name"/>
                </div>
                <div className="box lName">
                    <label htmlFor="lName">Last Name</label>
                        <input type="text" id="lName" name="lname" value={lname} onChange={handleLNameChange} required autoComplete="family-name"/>
                </div>
                <div className="box email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required autoComplete="email"/>
                </div>
                <div className="box role">
                    <label htmlFor="picture">Role</label>
                    <select name="user-role" id="user-role" value={role} onChange={handleRoleChange}>
                        <option value="FOOTBALL_FAN">Football Fan</option>
                        <option value="CUSTOMER_SERVICE">Customer service</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <div className="box password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required autoComplete="new-password"/>
                </div>
                <div className="box confirm-password">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} required autoComplete="new-password"/>
                </div>

                <button type="submit">Create User</button>
            </form>
        </div>
    )
}
export default UsersPage;