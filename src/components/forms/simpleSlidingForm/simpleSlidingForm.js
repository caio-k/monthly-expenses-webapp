import React, {useState} from "react";
import "./simpleSlidingForm.css";

function SimpleSlidingForm(props) {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  }

  return (
    <form className="simple-sliding-form" onSubmit={props.handleSubmit} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        maxLength={props.maxLength || 255}
        autoComplete="off"
        value={props.value}
        onChange={props.onChange}
        style={{width: hover ? props.inputWidth : 0}}
        required />

      <button id={props.buttonId} type="submit">
        <span className="button-text">{props.label}</span>
      </button>
    </form>
  )
}

export default SimpleSlidingForm;
