import React, { useState } from "react"

export default function CreateArtwork() {
  const [url, setUrl] = useState("")
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")

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
    formData.append("tag_ids", [6,9])
    const uploadFile = async () => {
      try {
        const options = {
          method: "POST",
          body: formData
        }
        const response = await fetch("https://artvista-api.onrender.com/art/", options)
        const responseWithBody = await response.json()
        // setUrl(responseWithBody.publicUrl)
        // console.log(url)
        if (response.status == 201) {
          setMessage("Artwork Uploaded!")
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
        <h3>(tags here too)</h3>
        <input type="submit" />
      </form>
      <h2>{message}</h2>
    </>
  )
}