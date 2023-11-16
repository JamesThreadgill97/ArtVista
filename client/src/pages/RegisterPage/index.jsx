import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [message,setMessage] = useState("")

  const handleTextInput = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword1Input = (e) => {
    setPassword1(e.target.value)
  }
  const handlePassword2Input = (e) => {
    setPassword2(e.target.value)
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
        const response = await fetch('https://artvista-api.onrender.com/users/login',options)
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id",data.user_id)
        if (response.status == 200) {
          setMessage("Register and Login successful!")

          setTimeout(()=>{
            navigate("/")
            setMessage("")
          },1000)
        }
      }
      catch(err) {
        console.error(err.message)
      }
    }

    const registerAccount = async () => {
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
        const response = await fetch('https://artvista-api.onrender.com/users/register', options)
        const data = await response.json()
        if (response.status == 201) {
          loginAccount()
        } else {
          setMessage("Failed to register.")
          setTimeout(()=>{
            setMessage("")
          }, 5000)
        }
      } 
      catch (err) {
        console.error(err.message)
        setMessage("Register unsuccessful. Try again.")
        setTimeout(()=>{
          setMessage("")
        }, 5000)
      }
    }
    if (password1 == password2) {
      registerAccount()
    } else {
      setMessage("Passwords do not match. Try again.")
      setTimeout(()=>{
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
        <input type="text" placeholder="Enter username" onChange={handleTextInput} value={username}/>
        <input type="password" placeholder="Enter password" onChange={handlePassword1Input} value={password1}/>
        <input type="password" placeholder="Enter password again" onChange={handlePassword2Input} value={password2}/>
        <input type="submit" value="Enter"/>
      </form>
      <h2>{message}</h2>
    </>
  )
}