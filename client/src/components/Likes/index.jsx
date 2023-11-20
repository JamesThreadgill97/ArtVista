import React, { useState, useEffect } from 'react'

export default function Likes({ id, artwork }) {
  const [likeNum, setLikeNum] = useState(0)
  const [likeImg, setLikeImg] = useState("https://storage.googleapis.com/artvista-images/blackheart.png")
  const [liked, setLiked] = useState(false)



  useEffect(() => {
    setLikeNum(artwork.likes)
    setLikeImg("https://storage.googleapis.com/artvista-images/blackheart.png")

    const checkIfLiked = async () => {
      try {
        if (localStorage.getItem("token")) {
          const options = {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
          const response = await fetch(`https://artvista-frontend.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
          const data = await response
          if (response.status == 200) {
            setLiked(await response.json())

            if (liked) { //issue here?
              setLikeImg("https://storage.googleapis.com/artvista-images/heart.png")
            } else {
              setLikeImg("https://storage.googleapis.com/artvista-images/blackheart.png")
            }
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }


    checkIfLiked()

  }, [artwork])


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
          const response = await fetch(`https://artvista-frontend.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
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
          const response = await fetch(`https://artvista-frontend.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
          const data = await response.json()
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
          const response = await fetch(`https://artvista-frontend.onrender.com/art/${id}`, options)
          if (response.status == 200) {
            setLikeNum(likeNum + 1)
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
          const response = await fetch(`https://artvista-frontend.onrender.com/art/${id}`, options)
          if (response.status == 200) {
            setLikeNum(likeNum - 1)
            destroyLike()
          }
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    if (!liked) {
      likeArtwork()
      setLiked(true)
    } else {
      unlikeArtwork()
      setLiked(false)
    }
  }
  return (
    <div>
      <img className="like-image" src={likeImg} alt="" onClick={handleClick} />
      <h3>{likeNum}</h3>
    </div>
  )
}
