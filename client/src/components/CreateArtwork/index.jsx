import React, {useState} from "react"

export default function CreateArtwork() {
  const [url,setUrl] = useState("")
  const [file,setFile] = useState(null)
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data:e.target.files[0],
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
    formData.append("file",file.data)
    formData.append("title",title)
    formData.append("description", description) //add tags at some point too
    const uploadFile = async () => {
      const options = {
        method: "POST",
        body: formData,
      }
      const response = await fetch("https://artvista-api.onrender.com/upload", options)
      const responseWithBody = await response.json()
      if (response) setUrl(responseWithBody.publicUrl)
    }
    
    uploadFile()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Post your art!</h2>
        <input type="file" accept="image/*" onChange={handleFileChange}/>
        <input type="text" placeholder="Enter title..." onChange={handleTextInput}/>
        <textarea placeholder="Enter description..." onChange={handleTextarea}></textarea>
        <h3>(tags here too)</h3>
        <input type="submit" />
      </form>
    </>
  )
}