import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ProfileLink({id}) {
  return (
    <NavLink className="nav-link profile-link" to={`/profile/${id}`}>
      Artist's profile
    </NavLink>
  )
}
