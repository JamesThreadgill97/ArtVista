import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Gallery, ProfileLink, Comments, CommentForm, Modal, Likes, TagsCard } from "../../components"

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
    document.getElementById("header").scrollIntoView({ behavior: "smooth" });
    setShowMoreArtworks(false)
    setComments([])
    setCommentMessage("")

    const fetchArtworks = async () => {
      const response = await fetch("https://artvista-api.onrender.com/art/")
      const data = await response.json()
      if (response.status == 200) {
        let array = data;
        array.sort((a, b) => b.id - a.id) //want to reorder this
        // setArtworks(array)
        const thisArtwork = array.filter((el)=>{
          return el.id==id
        })[0]
        let searchString = thisArtwork.title.concat(" ",thisArtwork.description," ", thisArtwork.username).split(/\s+/).filter(word=>word.length>2 && !["the","for","from"].includes(word.toLowerCase())).join(" ")
        console.log(searchString)
        const ArtworksBySearch = searchInArtworks(searchString,array)
        setArtworks(ArtworksBySearch)
      }
    }

    const fetchArtwork = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/${id}`)
        const data = await response.json()
        if (response.status == 200) {
          setArtwork(data)
          fetchArtworks()
        }
      }
      catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchArtwork()
  }, [id])

  useEffect(() => {
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

  // //gets all images
  // useEffect(() => {
  //   const fetchArtworks = async () => {
  //     const response = await fetch("https://artvista-api.onrender.com/art/")
  //     const data = await response.json()
  //     if (response.status == 200) {
  //       let array = data;
  //       array.sort((a, b) => b.id - a.id) //want to reorder this
  //       setArtworks(array)
  //       console.log(artwork)
  //       console.log(searchInArtworks("abstract",array))

  //     }
  //   }
    
  // }, [id])


  const searchInArtworks = (string,Arr) => {
    let searchArr = string.split(' ');
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
    // setArtworks(artworksMatchingSearch)
    return artworksMatchingSearch
  }

  const findSimilarArtworksByTags = (art_id) => {
    let similarArtworksByIdArr = []

    const getPostsByTag = async (tag_id) => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/arttags/${tag_id}`)
        const data = await response.json() // gives the posts containing a specified tag
        if (response.status == 200) {
          for (let j = 0; j < data.length; j++) {
            if (data[j].art_id != art_id) {
              similarArtworksByIdArr.push(data[j].art_id)
            }
          }


        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const getTags = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/tags/${art_id}`)
        const data = await response.json() // gives the tags of a specified post
        if (response.status == 200) {
          for (let i = 0; i < data.length; i++) {
            getPostsByTag(await data[i].tag_id)
          }
          //sort similarArtworksByIdArr/ remove repeats here

        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    getTags() //adds art_ids to similarArtworksByArr
    return similarArtworksByIdArr

  }


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
          <h1>{artwork.title}</h1>
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