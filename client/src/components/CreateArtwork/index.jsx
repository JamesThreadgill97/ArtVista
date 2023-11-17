import React, { useState, useEffect } from "react"
import { TagForm } from "../../components"

export default function CreateArtwork() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://artvista-api.onrender.com/tag")
        const data = await response.json()
        if (response.status == 200) {
          setTags(data.data)
        } else {
          setTags([])
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }
    fetchTags()
  }, [tags])

  const handleCheckbox = (e) => {
    console.log("checked")
    if (e.target.checked) {
      setSelectedTags(prevState => [...prevState, parseInt(e.target.dataset.number)])
    } else {
      setSelectedTags(prevState => prevState.filter((el) => el !== parseInt(e.target.dataset.number)))
    }
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],

    }
    setFile(img)
  }
  const handleTextInput = (e) => {
    setTitle(e.target.value)
  }
  const handleTextarea = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("user_id", localStorage.getItem("user_id"))
    formData.append("file", file.data)
    formData.append("title", title)
    formData.append("description", description) //add tags at some point too
    formData.append("likes", 0)
    formData.append("tag_ids", selectedTags)
    const uploadFile = async () => {
      try {
        const options = {
          method: "POST",
          body: formData
        }
        const response = await fetch("https://artvista-api.onrender.com/art/", options)

        setMessage("Artwork Uploaded!")
        if (response.status == 201) {
          setTimeout(() => {
            setMessage("")
          }, 5000)
        }
      }
      catch (err) {
        console.error({ error: err.message })
      }
    }
    uploadFile()
    setDescription("")
    setTitle("")
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Post your art!</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input type="text" placeholder="Enter title..." onChange={handleTextInput} value={title} />
        <textarea placeholder="Enter description..." onChange={handleTextarea} value={description}></textarea>
        <input type="submit" />
      </form>
      <TagForm tags={tags} setTags={setTags} handleCheckbox={handleCheckbox} />

      <h2>{message}</h2>
    </>
  )
}