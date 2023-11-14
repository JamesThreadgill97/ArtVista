import React from "react"
import { Gallery } from "../../components"

export default function HomePage() {
  return (
    <>
      <h1>Welcome to ArtVista</h1>
      <div className="gallery-container">
        <Gallery />
      </div>
    </>
  )
}