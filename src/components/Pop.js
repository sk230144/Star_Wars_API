// Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, residentsData }) => {
  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>Close</button>
          <h4>Residents:</h4>
          <ul>
            {residentsData.map((resident, idx) => (
              <li key={idx}>{resident.name}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default Popup;
