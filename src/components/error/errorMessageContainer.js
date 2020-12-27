import React from "react";
import "./errorMessageContainer.css";

function ErrorMessageContainer(props) {
  return (
    <div className="error-message-container">
      <p>{props.message}</p>
    </div>
  )
}

export default ErrorMessageContainer;
