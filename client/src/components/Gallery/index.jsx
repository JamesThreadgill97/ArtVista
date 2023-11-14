import React from 'react'
import ArtworkCard from "../ArtworkCard"

export default function Gallery() {
  //mocking data from fetch
  let arr = [];
  for (let i = 0; i<50;i++){
    arr.push({
      id: i,
      title: "title" + i,
      description: "description" + i,
      likes: 0
    })
  }
  return (
    <div className='gallery'>
      {arr.map((el)=><ArtworkCard id={el.id} title={el.title} description={el.description} key={el.id}/>)}
    </div>
  )
}


