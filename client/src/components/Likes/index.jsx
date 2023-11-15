import React, {useState,useEffect} from 'react'

export default function Likes({id}) {
  const [likeNum,setLikeNum] = useState(0)
  const [likeImg, setLikeImg] = useState("../../../assets/blackheart.png")

  useEffect(()=>{
    //get like number
  },[likeNum])

  const handleClick = () => {
    //add to like number
    const likeArtwork = async () => {
      const options = {

      }
      const response = await fetch()
    }
  }
  return (
    <div>
      <img className="like-image" src={likeImg} alt="" onClick={handleClick}/>
      <h3>{likeNum}</h3>
    </div>
  )
}
