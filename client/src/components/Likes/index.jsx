
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'


export default function Likes({ id, artwork }) {
  const [likeNum, setLikeNum] = useState(0)
  const [likeImg, setLikeImg] = useState("https://storage.googleapis.com/artvista-images/blackheart.png")
  const [liked, setLiked] = useState(false)



  useEffect(() => {
    setLikeNum(artwork.likes);
    const checkIfLiked = async () => {
      try {
        if (localStorage.getItem("token")) {
          const options = {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          };
          const response = await fetch(`https://artvista-api.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options);
          if (response.status === 200) {
            const likedData = await response.json();
            setLiked(likedData);
            // Update likeImg here based on the updated 'liked' state
            setLikeImg(likedData ? "https://storage.googleapis.com/artvista-images/heart.png" : "https://storage.googleapis.com/artvista-images/blackheart.png");
          }
        }
      } catch (err) {
        console.error({ error: err.message });
      }
    };
  
    checkIfLiked();
  }, [artwork, id]);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (liked) {
        setLikeImg("https://storage.googleapis.com/artvista-images/heart.png")
      } else {
        setLikeImg("https://storage.googleapis.com/artvista-images/blackheart.png")
      }

    }
  }, [liked])




  const handleClick = () => {

    const postLike = async () => {
      try {
        if (localStorage.getItem("token")) {
          const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Authorization": localStorage.getItem('token')
            }
          }
          const response = await fetch(`https://artvista-api.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
          const data = await response.json()
          if (response.status == 200) {
            console.log("posted")
          }
        }
        
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const destroyLike = async () => {
      try {
        if (localStorage.getItem("token")) {
          const options = {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              "Authorization": localStorage.getItem('token')
            }
          }
          const response = await fetch(`https://artvista-api.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
          const data = await response.json()
          if (response.status == 200) {
            console.log("posted")
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const likeArtwork = async () => {
      try {
        if (localStorage.getItem("token")) {
          const options = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({
              user_id: artwork.user_id,
              title: artwork.title,
              description: artwork.description,
              likes: artwork.likes + 1
            })
          }
          const response = await fetch(`https://artvista-api.onrender.com/art/${id}`, options)
          if (response.status == 200) {
            setLikeNum(likeNum + 1)
            artwork.likes++
            postLike()
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const unlikeArtwork = async () => {
      try {
        if (localStorage.getItem("token")) {
          const options = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({
              user_id: artwork.user_id,
              title: artwork.title,
              description: artwork.description,
              likes: artwork.likes - 1
            })
          }
          const response = await fetch(`https://artvista-api.onrender.com/art/${id}`, options)
          if (response.status == 200) {
            setLikeNum(likeNum - 1)
            artwork.likes--
            destroyLike()
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    if (localStorage.getItem("token")) {
      if (!liked) {
        likeArtwork()
        setLiked(true)
      } else {
        unlikeArtwork()
        setLiked(false)
      }
    } else {
      Swal.fire({
        title: "Oops...",
        text: "Unable to like this artwork. Make sure to login before liking a post.",
        icon: "error"
      });
    }
  }
  return (
    <div className="like-div">
      <img className="like-image" src={likeImg} alt="" onClick={handleClick} />
      <h3>{likeNum}</h3>
    </div>
  )
}
