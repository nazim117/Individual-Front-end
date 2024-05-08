
function User({user, handleDeleteUser}){

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(confirm("Are you sure you want to delete user?")){
            handleDeleteUser(user.id);
        }
    }
    return (
        <div>
            <li key={user.id}>{user.email} - {user.fname} {user.lname} 
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    <i className="fa fa-user-minus" aria-hidden="true"></i>
                </button>
                
            </form>
            </li>
        </div>
    )
}

export default User;