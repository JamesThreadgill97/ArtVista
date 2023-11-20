import React, { useState, useEffect } from 'react'

export default function TagsCard({ id }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`https://artvista-frontend.onrender.com/art/tags/${id}`)
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
  }, [])


  return (
    <div>
      {tags.map((el)=> <h3 key={el.tag_id}>{el.tag}</h3>)}
    </div>
  )
}
