import { Button } from "bootstrap";
import React, { Component } from "react";
import "./Sidebar.css";

function Sidebar(props) {
  const questionList = props.questions.map((qValues, qNumber) => {
    return (
      <li className="Question" key={qNumber}>
        <div id="Text" onClick={() => props.handleClick(qNumber)}>
          {`Question ${qNumber + 1}`}
        </div>
        <button id="Remove" onClick={() => props.handleRemove(qNumber)}>
          X
        </button>
      </li>
    );
  });

  return (
    <div className="Sidebar">
      <ul className="SidebarContent">
        {questionList}
        <li className="Add">
          <button onClick={props.handleAdd}>+</button>
        </li>
      </ul>
    </div>

  )
}

export default Sidebar;
