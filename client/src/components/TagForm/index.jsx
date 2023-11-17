import React, {useState} from 'react'

export default function TagForm({ tags, setTags, handleCheckbox }) {
  const [newTag,setNewTag] = useState("")


  return (
    <div>
      <h3>Tags</h3>
      <div>
        {tags.map((el) => <label key={el.id} className='tag-checkbox'>
          <span>{el.tag}</span>
          <input type="checkbox" onChange={handleCheckbox} data-number={el.id} />
        </label>)}
      </div>
    </div>
  )
}
