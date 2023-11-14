import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ArtworkCard({ id, title }) {
  return (
    <div className='artwork-card'>
      <NavLink to={`artwork/${id}`}>
        <img className='artwork-card-img' src="../../../assets/20190310175333_IMG_3027.JPG" alt={title} />
      </NavLink>
    </div>
  )
}
