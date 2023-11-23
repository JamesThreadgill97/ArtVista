import React, { useState, useEffect } from 'react'
import CommentCard from '../CommentCard'

export default function Comments({ comments }) {

  return (
    <>
      {comments.length > 0 && comments.map((el, i) => <CommentCard commentData={el} key={i} />)}
      {comments.length == 0 &&
        <div className='no-comments'>
          <h3>
            No comments. <br />Be the first to comment!
          </h3>
        </div>}
    </>
  )
}