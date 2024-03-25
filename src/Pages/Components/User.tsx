import React from "react";

interface User{
    id:number;
    fName: string;
    lName: string;
    picture: string;
}

function User({user}: {user:User}){
    return (
        <div>
            <p>ID: {user.id}</p>
            <p>Picture: {user.picture}</p>
        </div>
    )
}

export default User;