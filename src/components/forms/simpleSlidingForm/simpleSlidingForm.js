import React from "react";
import "./simpleSlidingForm.css";

function SimpleSlidingForm(props) {
  return (
    <form className="simple-sliding-form" onSubmit={props.handleSubmit}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        maxLength={props.maxLength || 255}
        autoComplete="off"
        value={props.value}
        onChange={props.onChange}
        style={{width: props.inputWidth}}
        required />

      <button id={props.buttonId} type="submit" className="custom-tooltip" data-tooltip={props.tooltipText}>
        <span className="button-text">{props.label}</span>
      </button>
    </form>
  )
}

export default SimpleSlidingForm;
