import React from "react";
import "./simpleLoadingButton.css";

function SimpleLoadingButton(props) {
  return (
    <button className={props.loading ? "spinner horizontal-effect-button" : "horizontal-effect-button"}
            onClick={props.onClick} style={{backgroundColor: props.backgroundColor, color: props.color}}>
      {props.loading ? "" : props.label}
    </button>
  )
}

export default SimpleLoadingButton;
