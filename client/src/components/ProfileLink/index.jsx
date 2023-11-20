import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function ProfileLink({ id }) {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/users/userInfo/${id}`)
        const data = await response.json()
        if (response.status == 200) {
          setUserInfo(data)
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    if (id) {
      fetchUserInfo()
    }
  }, [id])

  return (
    <div>
      <img className="profile-link-pic" src={userInfo.profile_url} alt="profile pic" />
      <NavLink className="nav-link profile-link" to={`/profile/${id}`}>
        {userInfo.username}
      </NavLink>

    </div>
  )
}
