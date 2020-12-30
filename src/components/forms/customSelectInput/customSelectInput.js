import React from "react";
import "./customSelectInput.css";

function CustomSelectInput(props) {
  return (
    <div className="custom-select-input" style={{minWidth: props.width || 220, maxWidth: props.width || 220}}>
      <select onChange={props.onChange} value={props.value}>
        {props.children}
      </select>
    </div>
  )
}

export default CustomSelectInput;
