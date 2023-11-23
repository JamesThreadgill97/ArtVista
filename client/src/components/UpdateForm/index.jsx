import React from 'react';
import Swal from 'sweetalert2';

const UpdateForm = ({bio,setBio,email,setEmail, setShowEditForm,setUserInfo}) => {
  
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const editUserInfo = async () => {
      const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          bio: bio,
          contact_url: email
        })
      }
      const response = await fetch(`https://artvista-api.onrender.com/users/update/${localStorage.getItem("user_id")}`, options)
      const data = await response.json()
      if (response.status==200) {
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
            Swal.fire('Updated!', 'Your profile has been updated.', 'success');
            setUserInfo(data)
          }
        });
      } else {
        Swal.fire({
          title: 'Edit Unsuccessful.',
          text: 'Make sure your bio and contact information',
          icon: "error"
        })
      }
    }
      
    editUserInfo()
    setShowEditForm(false)
  };

  return (
    <form onSubmit={handleSubmit} className='edit-form'>
      <div>
        <label htmlFor="email">Contact Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" value={bio} onChange={handleBioChange} maxLength="300"/>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UpdateForm;