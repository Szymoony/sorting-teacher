import React from "react";
import "./Submit.css";

function Submit(props) {
  return (
    <button class="SubmitButton" onClick={props.handleSubmit}>Submit</button>
  )
}

export default Submit;
