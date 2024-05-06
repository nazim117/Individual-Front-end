import React from "react"
import User from "./User";

function UserList({users, handleDeleteUser}) {

  return (
    <ul>
      {users.map(user => (
        <User key={user.id} user={user} handleDeleteUser={handleDeleteUser}/>
      ))}
    </ul>
  )
}

export default UserList;