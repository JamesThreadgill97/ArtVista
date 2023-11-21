import React, { useState, useEffect } from "react"
import { Gallery, SearchForm } from "../../components"
import searchIcon from "../../../assets/icons8-search-90.png"

export default function HomePage() {
  const [artworks, setArtworks] = useState([])
  const [showSearch,setShowSearch] = useState(false)



  //gets all images
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("https://artvista-api.onrender.com/art/")
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

  const toggleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <>
      <div className="home-page-top">
      <h1>Welcome to ArtVista</h1>
      <img class="search-icon" src={searchIcon} alt="search icon" onClick={toggleShowSearch} />
      </div>
      {
        showSearch && <SearchForm setArtworks={setArtworks} />
      }
      <div className="gallery-container">
        <Gallery artworks={artworks} />
      </div>
    </>
  )
}