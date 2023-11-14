import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ArtworkCard({ id, title }) {
  return (
    <div className='artwork-card'>
      <NavLink to={`/artwork/${id}`}>
        <img className='artwork-card-img' src="../../../assets/20220409132925_IMG_3548~2.JPG" alt={title} />
      </NavLink>
    </div>
  )
}
