import React, {useEffect, useState} from "react";
import userAPI from "../API/userAPI"
import UserList from "../components/UserList";

function UsersPage(){
    const [users, setUsers] = useState([]);

    const refreshUsers = () => {
        userAPI.getUsers()
            .then((data) =>{
                console.log(data);
                setUsers(data);
            })
            .catch((error)=>
            {
                console.log("Error occured: ", error)
            })
    }

    const addUser = (id, email, fName) => {
        const newUser = {
            id: id,
            email:email,
            fName: fName
        };

        userAPI.createUser(newUser)
            .then((res) =>{
                console.log(res);
                refreshUsers();
            })
            .catch((error) => {
                console.error("Error fetching items ", error)
            })

        setUsers([...users, newUser])
    }

    useEffect(() => {
        refreshUsers();
    }, []);

    return(
        <div>
        <h1>UserPage</h1>
            <UserList users={users}/>
        </div>
    )
}
export default UsersPage;