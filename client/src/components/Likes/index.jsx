import React, { useState, useEffect } from 'react'

export default function Likes({ id, artwork }) {
  const [likeNum, setLikeNum] = useState(0)
  const [likeImg, setLikeImg] = useState("../../../assets/blackheart.png")
  const [liked, setLiked] = useState(false)



  useEffect(() => {
    setLikeNum(artwork.likes)
    setLikeImg("../../../assets/blackheart.png")

    const checkIfLiked = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`)
        const data = await response
        if (response.status == 200) {
          setLiked(await response.json())
  
          if (liked) { //issue here?
            setLikeImg("../../../assets/heart.png")
          } else {
            setLikeImg("../../../assets/blackheart.png")
          }
        }
      } catch (err) {
        console.error({error:err.message})
      }
    }


    checkIfLiked()

  }, [artwork])


  useEffect(()=>{
    if (liked) {
      setLikeImg("../../../assets/heart.png")
    } else {
      setLikeImg("../../../assets/blackheart.png")
    }
    console.log(typeof liked)
  },[liked])




  const handleClick = () => {

    const postLike = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        }
        const response = await fetch(`https://artvista-api.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const destroyLike = async () => {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "content-type": "application/json"
          }
        }
        const response = await fetch(`https://artvista-api.onrender.com/art/like/${id}/${localStorage.getItem("user_id")}`, options)
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const likeArtwork = async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json"
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
          postLike()
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    const unlikeArtwork = async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json"
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
          destroyLike()
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
