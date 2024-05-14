import React from "react"
import User from "./User";

function UserList({users, handleDeleteUser}) {

  return (
    <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <User key={user.id} user={user} handleDeleteUser={handleDeleteUser}/>
      ))}
    </tbody>
    </table>
  )
}

export default UserList;