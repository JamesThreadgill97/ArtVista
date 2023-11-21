import React from 'react'
import ArtworkCard from "../ArtworkCard"

export default function Gallery({artworks}) {

  return (
    <div className='gallery'>
      {artworks.map((el,i)=><ArtworkCard id={el.id} title={el.title} url={el.url} key={i}/>)}
    </div>
  )
}


