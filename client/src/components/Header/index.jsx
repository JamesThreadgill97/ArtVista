import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token")
  }
  return (
    <>
      <header>
        <nav>
          <NavLink to="/create">Add</NavLink>
          <NavLink to="/">Home</NavLink>
          {/* changes header based on login status, doesn't automatically update though */}
          {localStorage.getItem("token") && <NavLink onClick={handleLogout}>Logout</NavLink>}
          {!localStorage.getItem("token") &&
          <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          </>
          
          }
        </nav>
      </header>
      <Outlet />
      <footer>ArtVista</footer>
    </>
  )
}