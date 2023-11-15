import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
  }
  return (
    <>
      <header>
        <nav>
          <NavLink className="nav-link" to="/create">Add</NavLink>
          <NavLink className="nav-link" to="/">Home</NavLink>
          {/* changes header based on login status, doesn't automatically update though */}
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
      <footer>&copy; npm-run-dev-vous 2023</footer>
    </>
  )
}