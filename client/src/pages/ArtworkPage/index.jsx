import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery, ProfileLink, Comments, CommentForm, Modal } from "../../components"

export default function ArtworkPage() {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [artwork,setArtwork] = useState({})
  const [artworks,setArtworks] = useState([])
  const [comments,setComments] = useState([])

  //gets all images
  useEffect(()=>{
    const fetchArtworks = async () => {
      const response = await fetch("https://artvista-api.onrender.com/art/")
      const data = await response.json()
      setArtworks(data)
    }
    fetchArtworks()
  },[])


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=> {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/${id}`)
        const data = await response.json()
        if (response.status == 200) {
          setArtwork(data)
        }
      }
      catch (err) {
        console.error({error: err.message})
      }
    }
    fetchArtwork()
  },[id])

  useEffect(()=>{
    const fetchComments = async () => {
      const response = await fetch(`https://artvista-api.onrender.com/art/${id}/comments`)
      const data = await response.json()
      if (data == "no comments") {
        setComments([])
      } else {
        setComments(data)
      }
    }
    fetchComments()
  },[id])

  return (
    <>
      <div className="artwork-and-info">
        <div className="displayed-artwork">
          <img src={artwork.url} alt={artwork.title} onClick={openModal} />
          <Modal className="modal" isOpen={isModalOpen} closeModal={closeModal}>
            <div className="modal-image-div">
              <img src={artwork.url} alt={artwork.title} className="modal-image" />
            </div>
          </Modal>
        </div>
        <div className="artwork-info">
          <h1>{artwork.title}</h1>
          <ProfileLink id={artwork.user_id} />
          <h3>TAGS HERE</h3>
          <p>{artwork.description}</p>
          <Comments id={id} comments={comments}/>
          <CommentForm id={id} setComments={setComments}/>
        </div>
      </div>
      <Gallery artworks={artworks}/>
    </>
  )
}