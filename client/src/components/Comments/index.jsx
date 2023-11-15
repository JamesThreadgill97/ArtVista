import React, {useState, useEffect} from 'react'
import CommentCard from '../CommentCard'

export default function Comments({id, comments}) {

  return (
    <>
    {comments.map((el,i)=> <CommentCard data={el} key={i}/>)}
    </>
  )
}