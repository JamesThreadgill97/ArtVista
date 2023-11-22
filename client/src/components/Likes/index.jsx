import React, {useState,useEffect} from 'react'

export default function Likes({id, artwork}) {
  const [likeNum,setLikeNum] = useState(0)
  const [likeImg, setLikeImg] = useState("../../../assets/blackheart.png")
   useEffect(()=>{
    setLikeNum(artwork.likes)
    setLikeImg("../../../assets/blackheart.png")
  },[artwork])

  const handleClick = () => {
    const likeArtwork = async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "content-type":"application/json"
          },
          body: JSON.stringify({
            user_id: artwork.user_id,
            title: artwork.title,
            description: artwork.description,
            likes: artwork.likes + 1
          })
        }
        const response = await fetch(`https://artvista-api.onrender.com/art/${id}`,options)
        if (response.status == 200) {
          setLikeImg("../../../assets/heart.png")
          setLikeNum(likeNum + 1)
        }
      } catch(err) {
        console.error({error: err.message})
      }
    }
    const unlikeArtwork = async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "content-type":"application/json"
          },
          body: JSON.stringify({
            user_id: artwork.user_id,
            title: artwork.title,
            description: artwork.description,
            likes: artwork.likes - 1
          })
        }
        const response = await fetch(`https://artvista-api.onrender.com/art/${id}`,options)
        if (response.status == 200) {
          setLikeImg("../../../assets/blackheart.png")
          setLikeNum(likeNum - 1)
        }
      } catch(err) {
        console.error({error: err.message})
      }
    }
    if (likeImg == "../../../assets/blackheart.png") {
      likeArtwork()
    } else {
      unlikeArtwork()
    }
  }
  return (
    <div>
      <img className="like-image" src={likeImg} alt="" onClick={handleClick}/>
      <h3>{likeNum}</h3>
    </div>
  )
}
