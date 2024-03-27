function User({user}){
    return (
        <div>
            <li key={user.id}>{user.email} - {user.fname} {user.lname}</li>
        </div>
    )
}

export default User;