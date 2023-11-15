import React, { useState } from "react"

export default function CreateArtwork() {
  const [url, setUrl] = useState("")
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

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
    console.log(file)
    let formData = new FormData()
    formData.append("file", file.data)
    formData.append("title", title)
    formData.append("description", description) //add tags at some point too
    formData.append("likes", 0)
    formData.append("tag_id", 1)
    const uploadFile = async () => {
      try {
        const options = {
          method: "POST",
          body: formData,
          // headers: {
          //   "content-type": "multipart/form-data"
          // }
        }
        console.log(options.body)
        const response = await fetch("https://artvista-api.onrender.com/art/", options)
        const responseWithBody = await response.json()
        // setUrl(responseWithBody.publicUrl)
        // console.log(url)
        // if (response == 201) {
        // }
      }
      catch (err) {
        console.error({ error: err.message })
      }
    }

    uploadFile()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Post your art!</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input type="text" placeholder="Enter title..." onChange={handleTextInput} />
        <textarea placeholder="Enter description..." onChange={handleTextarea}></textarea>
        <h3>(tags here too)</h3>
        <input type="submit" />
      </form>
    </>
  )
}