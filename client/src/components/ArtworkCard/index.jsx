import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ArtworkCard({ id, title, url}) {
  return (
    <div className='artwork-card'>
      <NavLink to={`/artwork/${id}`}>
        <img className='artwork-card-img' src={url} alt={title} />
      </NavLink>
    </div>
  )
}
