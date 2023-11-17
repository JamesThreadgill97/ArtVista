import React, {useState} from 'react'

export default function TagForm({ tags, setTags, handleCheckbox }) {
  const [newTag,setNewTag] = useState("")

  // const handleTextInput = (e) => {
  //   setNewTag(e.target.value)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const createTag = async () => {
  //     const options = {

  //     }
  //     const response = await fetch("https://artvista-api.onrender.com/tag/",options)
  //   }
  // }

  return (
    <div>
      <h3>Tags</h3>
      <div>
        {tags.map((el) => <label key={el.id} className='tag-checkbox'>
          <span>{el.tag}</span>
          <input type="checkbox" onChange={handleCheckbox} data-number={el.id} />
        </label>)}
        {/* <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="create a tag" value={newTag} onChange={handleTextInput}/>
            <input type="submit" />
          </form>
        </div> */}
      </div>
    </div>
  )
}
