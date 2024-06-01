import React from 'react';
import { IModal } from './IModal';
import './Modal.scss';

export const Modal: React.FC<IModal> = ({ isShow, onClose, children }) => {
  if (!isShow) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src="./assets/icons/cross.svg" className="modal-close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};
