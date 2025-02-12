import React from 'react'
import '../CSS/Undeploy.css';

function UndeployModel({ isOpen, onClose, onUndeploy }) {

    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-body">
          <h3>Are you sure you want to undeploy?</h3>
          <p>Undeploying will stop the app and make it unavailable to users</p>
          <div className="modal-actions">
            <button className="undeploy-button" onClick={onUndeploy}>Undeploy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UndeployModel
