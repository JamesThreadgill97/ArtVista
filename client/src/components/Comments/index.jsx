import React, {useState, useEffect} from 'react'
import CommentCard from '../CommentCard'

export default function Comments({id}) {
  const [comments, setComments] = useState([])

  useEffect(()=>{
    const fetchComments = async () => {
      const response = await fetch(`https://artvista-api.onrender.com/art/${id}/comments`)
      const data = await response.json()
      setComments(data)
    }
    fetchComments()
  },[comments])


  return (
    <>
    {comments.map((el)=> <CommentCard data={el}/>)}
    </>
  )
}