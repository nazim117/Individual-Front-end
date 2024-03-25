import React from "react";
import User from "./Components/User";

interface UserObject{
    id:number;
    fName: string;
    lName: string;
    picture: string;
}

function UsersPage({users}: {users: UserObject[]}){
    return(
        <div>
            <ul>
                {users.map(user => (
                    <User user={user}/>
                ))}
            </ul>
        </div>
    )
}
export default UsersPage;