import React from 'react';

import './modal.css';

export default function Modal({ fighter, onClose = () => {} }) {
  return (
    <div className="modal-layer">
      <div className="modal-root">
        <div className="modal-header">
          <span>{fighter.name} WINS!!!</span>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <img
            className="fighter-preview___img"
            src={fighter.img}
            alt={fighter.name}
          />
        </div>
      </div>
    </div>
  );
}
