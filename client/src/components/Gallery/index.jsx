import React, {useState,useEffect} from 'react'
import ArtworkCard from "../ArtworkCard"

export default function Gallery() {
  const [artworks,setArtworks] = useState([])
  //mocking data from fetch
  let arr = [];
  for (let i = 1; i<50;i++){
    arr.push({
      id: i,
      title: "title" + i,
      description: "description" + i,
      likes: 0
    })
  }

  //gets all images
  useEffect(()=>{
    const fetchArtworks = async () => {
      const response = await fetch("https://artvista-api.onrender.com/art/")
      const data = await response.json()
      console.log(data)
      setArtworks(data)
    }
    fetchArtworks()
  },[])

  return (
    <div className='gallery'>
      {artworks.map((el)=><ArtworkCard id={el.id} title={el.title} url={el.url} key={el.id}/>)}
    </div>
  )
}


