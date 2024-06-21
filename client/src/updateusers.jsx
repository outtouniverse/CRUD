import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/createuser.css';

function Updateusers() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [desp, setDesp] = useState('');
    const [art, setArt] = useState(null);
    const [aname, setAname] = useState('');
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/getuser/${id}`)
            .then(result => {
                const userData = result.data;
                setName(userData.name);
                setDesp(userData.desp);
                setArt(userData.image);
                setAname(userData.aname);
                setPreview(`http://localhost:5000${userData.image}`);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setArt(file);
        setPreview(URL.createObjectURL(file));
    };

    const updateUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('desp', desp);
        formData.append('aname', aname);
        if (art && typeof art !== 'string') {
            formData.append('art', art);
        }

        axios.put(`http://localhost:5000/updateUser/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log(result);
                navigate('/disp');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container'>
            <div className='form-wrapper'>
                <form onSubmit={updateUser}>
                    <h2>Update Art</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            id='name' 
                            name='name'  
                            placeholder='Enter name' 
                            className='form-control' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='desp'>Description</label>
                        <input 
                            type='desp'  
                            id='desp' 
                            name='desp' 
                            placeholder='Enter Description' 
                            className='form-control' 
                            value={desp} 
                            onChange={(e) => setDesp(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='art'>Image Upload</label>
                        <input 
                            type='file' 
                            id='art' 
                            name='art' 
                            className='form-control' 
                            onChange={handleImageChange} 
                        />
                        {preview && <img src={preview} alt='Current' style={{ maxWidth: '100px', marginTop: '10px' }} />}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='aname'>Artist Name</label>
                        
                        <input 
                            type='text' 
                            id='aname' 
                            name='aname'  
                            placeholder="Enter Artist's Name" 
                            className='form-control' 
                            value={aname} 
                            onChange={(e) => setAname(e.target.value)} 
                        />
                    </div>
                    <button 
                      type='submit' 
                      style={{ 
                          backgroundColor: 'green', 
                          color: 'white', 
                          borderRadius: '5px', 
                          padding: '10px 20px', 
                          border: 'none', 
                          cursor: 'pointer', 
                          width: '50%', 
                          marginLeft:'113px'
                      }}
                  >
                      SUBMIT
                  </button>
                </form>
            </div>
        </div>
    );
}

export default Updateusers;
