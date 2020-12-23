import React from "react";
import "./simpleButton.css";

function SimpleButton(props) {
  return (
    <button className="horizontal-effect-button" onClick={props.onClick}
            style={{backgroundColor: props.backgroundColor, color: props.color}}>
      {props.label}
    </button>
  )
}

export default SimpleButton;
