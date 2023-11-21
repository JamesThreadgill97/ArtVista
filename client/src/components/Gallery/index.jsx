import React from 'react'
import ArtworkCard from "../ArtworkCard"

export default function Gallery({artworks}) {

  return (
    <div className='gallery'>
      {artworks.map((el,i)=><ArtworkCard id={el.art_id} title={el.title} url={el.url} key={i}/>)}
    </div>
  )
}


