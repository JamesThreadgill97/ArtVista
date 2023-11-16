import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery } from "../../components"

export default function ProfilePage() {
  const { id } = useParams()
  const [artworks,setArtworks] = useState([])
  const [userInfo,setUserInfo] = useState({})

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
  useEffect(()=>{
    const fetchUserDataById = async () => {
      const response = await fetch(`https://artvista-api.onrender.com/users/userInfo/${id}`)
      const data = await response.json()
      if (response.status == 200) {
        setUserInfo(data)
      }
    }
    fetchUserDataById()
  },[])
  return (
    <>  
      <div>
        <h1>{userInfo.username}</h1>
      </div>
        <Gallery artworks={artworks}/>
    </>
  )
}