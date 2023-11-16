import React, {useState} from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [message,setMessage] = useState("")


  const handleTextInput = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const loginAccount = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        }

        const response = await fetch('https://artvista-api.onrender.com/users/login', options)
        const data = await response.json()
        localStorage.setItem("token", data.token)
<<<<<<< HEAD
        localStorage.setItem("user_id",data.user_id)
=======
>>>>>>> 8dc2142ccfe5cb95d951f151808f948a1a85ad8a
        if (response.status == 200) {
          setMessage("Login successful!")
          setTimeout(()=>{
            navigate("/")
            setMessage("")
          },1000)
        }
        
      }
      catch(err) {
        console.error(err.message)
        setMessage("Login unsuccessful.")
        setTimeout(()=>{
          setMessage("")
        },5000)
      }
    }
    loginAccount()
    setUsername("")
    setPassword("")
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter username" onChange={handleTextInput}/>
        <input type="password" placeholder="Enter password" onChange={handlePassword}/>
        <input type="submit" value="Enter"/>
      </form>
      <h2>{message}</h2>
    </>
  )
}