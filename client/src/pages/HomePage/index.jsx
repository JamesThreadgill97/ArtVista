import React, { useState, useEffect } from "react"
import { Gallery, SearchForm } from "../../components"
import searchIcon from "../../../assets/icons8-search-90.png"

export default function HomePage() {
  const [artworks, setArtworks] = useState([])



  //gets all images
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("https://artvista-frontend.onrender.com/art/")
        const data = await response.json()
        if (response.status == 200) {
          let array = data;
          array.sort((a,b) => b.id - a.id)
          setArtworks(array)

        } else {
          setArtworks([])
        }
      } catch (err) {
        console.error({error:err.message})
      }
    }
    fetchArtworks()
  }, [])



  return (
    <>
      <div className="home-page-top">
      <SearchForm setArtworks={setArtworks} />
      </div>
     
      <div className="gallery-container">
        <Gallery artworks={artworks} />
      </div>
    </>
  )
}