import React, {useState} from 'react'

export default function CommentForm({id, setComments}) {
  const [comment,setComment] = useState("")

  const handleTextarea = (e) => {
    setComment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const postComment = async () => {
      try{
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Authorization": localStorage.getItem('token')
          },
          body: JSON.stringify({
            user_id: 2,//need to get this
            art_id: id,
            content: comment
          })
        }
        const response = await fetch("https://artvista-api.onrender.com/comment", options)
        if (response.status == 201) {
          const fetchComments = async () => {
            const response = await fetch(`https://artvista-api.onrender.com/art/${id}/comments`)
            const data = await response.json()
            setComments(data)
          }
          fetchComments()
        }
      } catch (err) {
        console.error({error: err.message})
      }
    }
    postComment()
    setComment("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="" id="" cols="30" rows="3" placeholder='Comment here...' onChange={handleTextarea} value={comment}></textarea>
        <input type="submit" />
      </form>
    </div>
  )
}
