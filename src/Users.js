import React, {useEffect, useState} from 'react';

function UsersList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/login/all')
        .then(response => response.json)
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching all users: ', error));
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>{users.map(user => (<li key={user.id}>{user.username}</li>))}</ul>
        </div>
            
    );
}

export default UsersList;