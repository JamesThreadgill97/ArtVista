import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchForm({setArtworks}) {
  const navigate = useNavigate()
  const [textInput, setTextInput] = useState("")
  const [filteredArtworks, setFilteredArtworks] = useState([])

  const handleTextInput = (e) => {
    setTextInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fetchArtworks = async () => {
      try {
        const response = await fetch("https://artvista-api.onrender.com/art/")
        const data = await response.json()
        if (response.status == 200) {
          searchInArtworks(data)
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }

    const searchInArtworks = (Arr) => {
      let searchArr = textInput.split(' ');
      let artworksToBeSearched = Arr
      let artworksMatchingSearch = []
      for (let i = 0; i < searchArr.length; i++) { //checks each word in search
        //if word found in an artwork, add that artwork to filteredArtworks, and remove it from artworks
        for (let j = artworksToBeSearched.length - 1; j >= 0; j--) {
          //searches title
          if (artworksToBeSearched[j].title.toLowerCase().includes(searchArr[i].toLowerCase())) {
            artworksMatchingSearch.push(artworksToBeSearched[j])
            artworksToBeSearched.splice(j, 1)
          } else {
            if (artworksToBeSearched[j].description.toLowerCase().includes(searchArr[i].toLowerCase())) {
              artworksMatchingSearch.push(artworksToBeSearched[j])
              artworksToBeSearched.splice(j, 1)
            } //add more for usernames and tags too?
          }
        }
      }
      setArtworks(artworksMatchingSearch)
    }
    fetchArtworks()
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
