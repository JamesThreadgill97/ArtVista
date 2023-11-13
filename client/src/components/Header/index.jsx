import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/create">Add</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer>ArtVista</footer>
    </>
  )
}