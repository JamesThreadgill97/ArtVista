import React from 'react';

const Modal = ({ isOpen, onClose,closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal is-open">
      <div className="modal-content">
        <span class="close" onClick={closeModal}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
