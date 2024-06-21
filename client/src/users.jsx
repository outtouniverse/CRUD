import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '/src/users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/disp')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/deleteUser/' + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100'>
            <div className='w-100 bg-white rounded p-3'>
                <div className='gallery-text'>GALLERY</div>
                <div className='button-container'>
                    <h4 className='btn-btn'>Add Image</h4>
                    <Link to={`/create`}><FontAwesomeIcon icon={faAdd} className='btn-btn' /></Link>
                </div>
                <div className='user-grid'>
                    {users.map((user) => {
                        return (
                            <div key={user._id} className='user-details'>
                                <div className='user-image'>
                                    <img src={`http://localhost:5000${user.image}`} alt={user.name} />
                                </div>
                                <div className='user-info'>
                                    <h1>{user.name}</h1>
                                    <p>{user.desp}</p>
                                    <p>By: <b>{user.aname}</b></p>
                                    <div className='all-btn'>
                                        <Link to={`/update/${user._id}`} className='all-btn-cl'>UPDATE</Link>
                                        <button className='all-btn-cld' onClick={() => handleDelete(user._id)}>DELETE</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Users;
