import React from "react";
import "./modal.css";

function Modal(props) {

  return (
    <div className="custom-modal">
      <div className="custom-modal-container">
        <button className="custom-modal-close-button" onClick={props.onClose}/>
        <div className="custom-modal-content">{props.children}</div>
      </div>
    </div>
  )
}

export default Modal;
