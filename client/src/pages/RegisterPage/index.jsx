import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState(null)
  const [image, setImage] = useState("")

  const handleTextInput = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword1Input = (e) => {
    setPassword1(e.target.value)
  }
  const handlePassword2Input = (e) => {
    setPassword2(e.target.value)
  }
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],

    }
    setImage(img.preview)
    setFile(img)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const loginAccount = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password1
          })
        }
        const response = await fetch('https://artvista-api.onrender.com/users/login', options)
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id", data.user_id)
        if (response.status == 200) {
          Swal.fire({
            title: "Welcome to ArtVista!",
            text: "Account created. You are being logged in.",
            icon: "success"
          })
          setTimeout(() => {
            navigate("/")
            setMessage("")
          }, 1000)
        }
      }
      catch (err) {
        console.error(err.message)
      }
    }

    const registerAccount = async () => {
      try {
        let formData = new FormData()
        formData.append("username", username)
        formData.append("password", password1)
        if (file) {
          formData.append("file", file.data)
        }
        
        const options = {
          method: "POST",
          body: formData
        }

        const response = await fetch('https://artvista-api.onrender.com/users/register', options)
        const data = await response.json()
        if (response.status == 201) {
          console.log(data)
          loginAccount()
        } else {
          Swal.fire({
            title: "Unable to create account",
            text: "Check all information been entered correctly.",
            icon: "error"
          })
          setTimeout(() => {
            setMessage("")
          }, 5000)
        }
      }
      catch (err) {
        console.error(err.message)
        setTimeout(() => {
          setMessage("")
        }, 5000)
      }
    }
    if (password1 == password2) {
      registerAccount()
    } else {
      Swal.fire({
        title: "Passwords don't match",
        text: "Try again. Make sure the passwords match.",
        icon: "error"
      })
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
    setUsername("")
    setPassword1("")
    setPassword2("")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter username" onChange={handleTextInput} value={username} maxLength="15"/>
        <input type="password" placeholder="Enter password" onChange={handlePassword1Input} value={password1} maxlength="15"/>
        <input type="password" placeholder="Enter password again" onChange={handlePassword2Input} value={password2} maxLength="15" />
        <div className="profile-image-input">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {
          image && <img src={image} alt="profile picture preview" />
        }
        
        </div>
        <input type="submit" value="Enter" />
      </form>
      <h2>{message}</h2>
    </>
  )
}