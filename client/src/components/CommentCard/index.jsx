import React from 'react'

export default function CommentCard({data}) {
  return (
    <div className='comment-card'>
      <h3>{data.content}</h3>
    </div>
  )
}
