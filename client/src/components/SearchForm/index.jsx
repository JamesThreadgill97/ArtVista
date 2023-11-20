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



      for (let i = 0; i < searchArr.length; i++) {
        for (let j = artworksToBeSearched.length - 1; j >= 0; j--) {
          if (
            artworksToBeSearched[j].title.toLowerCase().includes(searchArr[i].toLowerCase()) ||
            artworksToBeSearched[j].description.toLowerCase().includes(searchArr[i].toLowerCase()) ||
            artworksToBeSearched[j].username.toLowerCase().includes(searchArr[i].toLowerCase())
          ) {
            artworksMatchingSearch.push(artworksToBeSearched[j])
            artworksToBeSearched.splice(j, 1)
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
