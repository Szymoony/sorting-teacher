import React from "react";
import "../assets/Submit.css";

function Submit(props) {
  return (
    <button class="SubmitButton" onClick={props.handleSubmit}>Submit</button>
  )
}

export default Submit;
