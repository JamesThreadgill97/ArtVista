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
        if (localStorage.getItem("token")) {
          const options = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify({
              user_id: localStorage.getItem('user_id'),
              art_id: id,
              content: comment
            })
          }
          const response = await fetch("https://https://artvista-frontend.onrender.com//comment", options)
          if (response.status == 201) {
            const fetchComments = async () => {
              const response = await fetch(`https://https://artvista-frontend.onrender.com//art/${id}/comments`)
              const data = await response.json()
              setComments(data)
            }
            fetchComments()
          } else {
            alert("Login before you leave a comment.")
          }
        }
      } catch (err) {
        console.error({error: err.message})
      }
    }
    postComment()
    setComment("")
  }

  return (
      <div className="comment-create" onSubmit={handleSubmit}>
        <textarea name="" id="" cols="30" rows="3" placeholder='Comment here...' onChange={handleTextarea} value={comment}></textarea>
        <input value="" type="submit" onClick={handleSubmit}/>
      </div>
  )
}
