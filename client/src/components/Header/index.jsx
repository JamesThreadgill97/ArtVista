import React, {useState, useEffect} from "react"
import { NavLink, Outlet } from "react-router-dom"


export default function Header() {
  const [username,setUsername] = useState("")
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
  }

  useEffect(()=>{
    const fetchUserData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            token: localStorage.getItem("token")
          })
        }
        console.log(options)
        const response = await fetch("https://artvista-api.onrender.com/users/showId", options)
        const data = await response.json()
        if (response.status == 201) {
          if (data.user_id == localStorage.getItem("user_id")) {
            setUsername(data.username)
          } else {
            console.error("user_ids don't match")
          }
        }
      } catch (err) {
        console.error({error:err.message})
      }
    }
    // if (localStorage.getItem("token")) {
    //   fetchUserData()
    // }
  },[localStorage.getItem("token")])

  return (
    <>
      <header>
        <nav>
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/create">Add</NavLink>
          {/* changes header based on login status, doesn't automatically update though */}
          {localStorage.getItem("token") &&
            <div>
              <NavLink>{username}</NavLink>
            </div>
          }

          {localStorage.getItem("token") && <NavLink className="nav-link" onClick={handleLogout}>Logout</NavLink>}
          {!localStorage.getItem("token") &&
            <>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </>

          }
        </nav>
      </header>
      <Outlet />
      <footer>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dmca">DMCA</NavLink>
        <NavLink to="/etiquette">Etiquette</NavLink>
        <NavLink to="/contactUs">Contact Us</NavLink>
      </footer>
    </>
  )
}