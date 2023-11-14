import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Gallery, ProfileLink, Comment, CommentForm, Modal } from "../../components"

export default function ArtworkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { id } = useParams()
  const data = {
    id: id,
    title: "title" + id,
    description: "description" + id,
    likes: 0
  }
  return (
    <>
      <div className="artwork-and-info">
        <div className="displayed-artwork">
          <img src="../../../assets/20220409132925_IMG_3548~2.JPG" alt={data.title} onClick={openModal} />
          <Modal className="modal" isOpen={isModalOpen} closeModal={closeModal}>
            <div className="modal-image-div">
              <img src="../../../assets/20220409132925_IMG_3548~2.JPG" alt={data.title} className="modal-image" />
            </div>
          </Modal>
        </div>
        <div className="artwork-info">
          <h1>{data.title}</h1>
          <ProfileLink id={id} />
          <h3>TAGS HERE</h3>
          <p>{data.description}</p>
          <Comment />
          <CommentForm />
        </div>
      </div>
      <Gallery />
    </>
  )
}