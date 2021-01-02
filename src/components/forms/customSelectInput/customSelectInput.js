import React from "react";
import "./customSelectInput.css";

function CustomSelectInput(props) {
  return (
    <div className="custom-select-input">
      <select onChange={props.onChange} value={props.value}>
        {props.children}
      </select>
    </div>
  )
}

export default CustomSelectInput;
