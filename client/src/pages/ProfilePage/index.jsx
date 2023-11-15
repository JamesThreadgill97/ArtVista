import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery } from "../../components"

export default function ProfilePage() {
  const [artworks,setArtworks] = useState([])
  const { id } = useParams()
  useEffect(()=>{
    const fetchArtworks = async () => {
      try{
        const response = await fetch("https://artvista-api.onrender.com/art/")
        const data = await response.json()
        if (response.status == 200)
        setArtworks(data.filter((el) => el.user_id == id))
      } catch (err) {
        console.error({error:err.message})
      }
    }
    fetchArtworks()
  },[])
  return (
    <>
        <Gallery artworks={artworks}/>
    </>
  )
}