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
        const response = await fetch("https://https://artvista-frontend.onrender.com//art/")
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
      try {
        if (localStorage.getItem("token")) {
          const response = await fetch(`https://https://artvista-frontend.onrender.com//users/userInfo/${id}`)
          const data = await response.json()
          if (response.status == 200) {
            setUserInfo(data)
          }
        }
      } catch (err) {
        console.error({error:err.message})
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