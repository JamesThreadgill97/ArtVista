import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery, ProfileLink, Comments, CommentForm, Modal } from "../../components"

export default function ArtworkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments,setComments] =useState([])
  const [artwork,setArtwork] = useState({})
  const [artworks,setArtworks] = useState([])

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
  const { id } = useParams()

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
          
          {/* <Comments id={id}/> */}
          <CommentForm setComments={setComments} id={id}/>
        </div>
      </div>
      <Gallery artworks={artworks}/>
    </>
  )
}