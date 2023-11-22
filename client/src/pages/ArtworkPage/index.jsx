import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery, ProfileLink, Comments, CommentForm, Modal, Likes, TagsCard } from "../../components"
import dots from "../../../assets/icons8-dots-50.png"

export default function ArtworkPage() {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [artwork, setArtwork] = useState({})
  const [artworks, setArtworks] = useState([])
  const [comments, setComments] = useState([])
  const [commentMessage, setCommentMessage] = useState("")
  const [showMoreArtworks, setShowMoreArtworks] = useState(false)



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("https://artvista-api.onrender.com/art/")
        const data = await response.json()
        if (response.status == 200) {
          setArtworks(data)
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchArtworks()
  }, [])


  useEffect(() => {
    setShowMoreArtworks(false)
    setComments([])
    setCommentMessage("")

    const fetchSimilarArtworks = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/similar/${id}`)
        const data = await response.json()
        if (response.status == 200) {

          setArtworks(data.slice(0, 20))
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }

    const fetchArtwork = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/${id}`)
        const data = await response.json()
        if (response.status == 200) {
          setArtwork(data)
          fetchSimilarArtworks()
        }
      }
      catch (err) {
        console.error({ error: err.message })
      }
    }
    const fetchComments = async () => {
      const response = await fetch(`https://artvista-api.onrender.com/art/${id}/comments`)
      const data = await response.json()
      if (data == "no comments") {
        setComments([])
        setCommentMessage("No comments")
      } else {
        setComments(data)
      }
    }
    fetchComments()
    fetchArtwork()
  }, [id])

  useEffect(() => {
    if (comments.length == 0) {
      setCommentMessage("No comments")
    } else if (comments.length == 1) {
      setCommentMessage("1 comment")
    } else {
      setCommentMessage(`${comments.length} comments`)
    }
  }, [comments])


  const toggleShowMoreArtworks = () => {
    if (!showMoreArtworks) {
      setTimeout(() => {
        document.getElementById("hide-btn").scrollIntoView({ behavior: "smooth" });
      }, 0)
      setShowMoreArtworks(!showMoreArtworks)
    } else {
      setShowMoreArtworks(!showMoreArtworks)
    }
  }

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
          <div className="artwork-info-title">
          <h1>{artwork.title}</h1>
          {
            artwork.user_id == localStorage.getItem("user_id") && <img src={dots} alt="delete dots" />
          }
          
          </div>
          <ProfileLink id={artwork.user_id} />
          <TagsCard id={id} />
          <p>{artwork.description}</p>
          <div className="statistics-bar">
            <h3>{commentMessage}</h3>
            <Likes id={id} artwork={artwork} />
          </div>
          <div className="comment-section">
            <Comments comments={comments} />
          </div>
          <CommentForm id={id} setComments={setComments} />
        </div>
      </div>
      {
        !showMoreArtworks && <button className="show-more-btn" onClick={toggleShowMoreArtworks}>See More</button>
      }

      {
        showMoreArtworks &&
        <div>
          <button id="hide-btn" className="show-more-btn" onClick={toggleShowMoreArtworks}>Hide Artworks</button>
          <Gallery artworks={artworks} />
        </div>

      }
    </>
  )
}