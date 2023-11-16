import React, { useState } from 'react'

export default function SearchForm() {
  const [textInput, setTextInput] = useState("")
  const [artworks, setArtworks] = useState([])
  const [filteredArtworks, setFilteredArtworks] = useState([])

  const handleTextInput = (e) => {
    setTextInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchArtworks = async () => {
      const response = await fetch("https://artvista-api.onrender.com/art/")
      const data = await response.json()
      setArtworks(data)
    }
    fetchArtworks()

    const searchInArtworks = () => {
      let searchArr = textInput.split(' ');
      let artworksToBeSearched = artworks
      let artworksMatchingSearch = []
      for (let i = 0; i < searchArr.length; i++) { //checks each word in search
        //if word found in an artwork, add that artwork to filteredArtworks, and remove it from artworks
        for (let j = artworks.length; j >= 0; j--) {
          //searches title
          if (lowercase(artworks[j].title).includes(searchArr[i])) {
            artworksMatchingSearch.push(artworks[j])
            artworksToBeSearched.splice(j, 1)
          } else {
            if (lowercase(artworks[j].description).includes(searchArr[i])) {
              artworksMatchingSearch.push(artworks[j])
              artworksToBeSearched.splice(j, 1)
            } //add more for usernames and tags too?
          }
        }
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search...' onChange={handleTextInput} value={textInput} />
        <input type="submit" />
      </form>
    </div>
  )
}
