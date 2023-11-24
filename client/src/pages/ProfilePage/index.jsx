import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery, UpdateForm } from "../../components"
import pen from "../../../assets/pen.png"

export default function ProfilePage() {
  const { id } = useParams()

  const [artworks, setArtworks] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [showEditForm, setShowEditForm] = useState(false)
  //set these as previous
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setArtworks([])
    const fetchArtworks = async () => {
      try {
        const response = await fetch("https://artvista-api.onrender.com/art/")
        const data = await response.json()
        if (response.status == 200)
          setArtworks(data.filter((el) => el.user_id == id))
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchArtworks()

  }, [id])
  useEffect(() => {
    setUserInfo({})
    const fetchUserDataById = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/users/userInfo/${id}`)
        const data = await response.json()
        if (response.status == 200) {
          setUserInfo(data)
          if (data.bio) {
            setBio(data.bio)
          }
          if (data.contact_url) {
            setEmail(data.contact_url)
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchUserDataById()
  }, [id])
  
  const toggleShowEditForm = () => {
    setShowEditForm(!showEditForm)
  }

  return (
    <>
      <div className="profile-page">
        <div className="profile-page-info">
          {
            localStorage.getItem("user_id") == userInfo.id &&
            <div className="edit-button">
              <img src={pen} alt="edit pen"  onClick={toggleShowEditForm}/>
            </div>
          }
          <img className="profile-page-pic" src={userInfo.profile_url} alt="Profile Pic" />
          <h1>{userInfo.username}</h1>
          {
            !showEditForm ?
              <div>
                {
                  userInfo.bio && <h3>Contact: <a className="contact-email" href="mailto:www.google.com">{userInfo.contact_url}</a></h3>
                }
                
                <p>{userInfo.bio}</p>
              </div> : <UpdateForm bio={bio} setBio={setBio} email={email} setEmail={setEmail} setShowEditForm={setShowEditForm} setUserInfo={setUserInfo}/>
          }

        </div>
        <div className="profile-page-artwork">
          {artworks.length == 0 && <h2>{userInfo.username}'s gallery is empty.</h2>}
          <Gallery className="profile-gallery" artworks={artworks} />
        </div>
      </div>
    </>
  )
}