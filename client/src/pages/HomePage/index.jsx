import React, {useState, useEffect} from "react"
import { Gallery } from "../../components"

export default function HomePage() {
  const [artworks,setArtworks] = useState([])

  //gets all images
  useEffect(()=>{
    const fetchArtworks = async () => {
      const response = await fetch("https://artvista-api.onrender.com/art/")
      const data = await response.json()
      setArtworks(data)
    }
    fetchArtworks()
  },[])

  return (
    <>
      <h1>Welcome to ArtVista</h1>
      <div className="gallery-container">
        <Gallery artworks={artworks}/>
      </div>
    </>
  )
}