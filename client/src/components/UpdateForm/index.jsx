import React, { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateForm = () => {
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
       
            //do api call here
        Swal.fire('Updated!', 'Your profile has been updated.', 'success');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" value={bio} onChange={handleBioChange} />
      </div>
      <div>
        <label htmlFor="email">Contact Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateForm;