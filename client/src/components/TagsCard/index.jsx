import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"

export default function TagsCard() {
  const { id } = useParams()
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`https://artvista-api.onrender.com/art/tags/${id}`)
        const data = await response.json()
        if (response.status == 200) {
          setTags(data)
        } else {
          setTags([])
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchTags()
  }, [id])


  return (
    <div className='tags'>
      {tags.map((el)=> <h3 key={el.tag_id}>#{el.tag}</h3>)}
    </div>
  )
}
