
function User({user, handleDeleteUser}){

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(confirm("Are you sure you want to delete user?")){
            handleDeleteUser(user.id);
        }
    }
    return (
        <tr key={user.id}>
            <td>{user.email} </td>
            <td>{user.fname}</td> 
            <td>{user.lname}</td>
            <td>
                <form onSubmit={handleSubmit}>
                    <button type="submit">
                        <i className="fa fa-user-minus" aria-hidden="true"></i>
                    </button>
                </form>
            </td>
        </tr>
    )
}

export default User;