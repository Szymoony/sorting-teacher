import React from "react";
import "./Sidebar.css";

function Sidebar(props) {
  const questionList = props.questions.map((qValues, qNumber) => {
    return (
      <li className="Question" key={qNumber} id={props.currentQuestion === qNumber ? "Selected" : "Unselected"}>
        <div
          id="Text"
          onClick={() => props.handleClick(qNumber)}
        >
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
        <input 
          className="ProblemSetName"
          value={props.problemSetName}
          onChange={props.handleNameChange}
        />
        {questionList}
        <li className="Add">
          <button onClick={props.handleAdd} id="AddButton">+</button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;
