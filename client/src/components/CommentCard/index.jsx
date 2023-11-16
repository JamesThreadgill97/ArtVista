import React, {useEffect, useState} from 'react'

export default function CommentCard({data}) {
  useEffect(()=>{
    const fetchUserDataById = async () => {

    }
  },[])
  return (
    <div className='comment-card'>
      <h2>User: {data.user_id}</h2>
      <h3>{data.content}</h3>
    </div>
  )
}
