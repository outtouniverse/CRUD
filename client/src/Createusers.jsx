import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createuser.css'; // Ensure correct path to CSS file

function Createusers() {
  const [name, setName] = useState('');
  const [desp, setDesp] = useState('');
  const [art, setArt] = useState(null);
  const [aname, setAname] = useState('');
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('desp', desp);
    formData.append('art', art);
    formData.append('aname', aname);

    try {
      const result = await axios.post('http://localhost:5000/createUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(result);
      navigate('/disp');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div className='container'>
      <div className='form-wrapper'>
        <form onSubmit={Submit} encType="multipart/form-data">
          <h2>ADD Art</h2>
          <div className='mb-2'>
            <label htmlFor=''>Name of the Art</label>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Description</label>
            <textarea
              name='desp'
              placeholder='Enter description about your art work'
              className='form-control'
              value={desp}
              onChange={(e) => setDesp(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Image Upload</label>
            <input
              type='file'
              name='art'
              className='form-control'
              onChange={(e) => setArt(e.target.files[0])}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Artist Name</label>
            <input
              type='text'
              name='aname'
              placeholder="Enter Artist's Name"
              className='form-control'
              value={aname}
              onChange={(e) => setAname(e.target.value)}
            />
          </div>
          <button type="submit" className='btn btn-success'>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default Createusers;
