import React from 'react';

const Modal = ({ isOpen, onClose,closeModal, children }) => {
  if (!isOpen) return null;

  function handleClick(e) {
    if(e.target.className=='modal-content'){
      closeModal()
    }
  }

  return (
    <div className="modal is-open" data-testid="modal is-open">
    <div className="modal-content" onClick={handleClick}>
        <span className="close" onClick={closeModal}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
