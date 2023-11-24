import React, { useState, useEffect } from "react"

import { useParams, useNavigate } from "react-router-dom"
import { Gallery, ProfileLink, Comments, CommentForm, Modal, Likes, TagsCard } from "../../components"
import Swal from "sweetalert2"

export default function ArtworkPage() {
  const navigate = useNavigate()
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
          let array = data;
        array.sort((a, b) => b.id - a.id)
          setArtworks(array.slice(0,20))
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

  useEffect(() => {
    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);

    // Clean up the event listener on component unmount
    return () => {
        window.removeEventListener('contextmenu', handleContextMenu);
    };
}, []);

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
          </div>
          <ProfileLink id={artwork.user_id} />

          <p className="artwork-description">{artwork.description}</p>
          <TagsCard id={id} />
          <div className="statistics-bar">
            <h3>{commentMessage}</h3>
            <Likes id={id} artwork={artwork} />
          </div>
          <div className="comments">
            <div className="comment-section">
              <Comments comments={comments} />            
            </div>
            <CommentForm id={id} setComments={setComments} />
          </div>
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