import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Bar from "./Bar";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import Sidebar from "./Sidebar";
import SortSelection from "./SortSelection";
import Submit from "./Submit";
import "../assets/ProblemSetCreator.css";

const SortableItem = sortableElement(
  ({ index, itemIndex, value, _height, _width, handleChange }) => (
    <Bar height={_height} width={_width}>
      <input
        id="value"
        value={value}
        onChange={(e) => handleChange(itemIndex, e)}
      />
    </Bar>
  )
);

const SortableContainer = sortableContainer(({ children }) => (
  <Row
    style={{
      height: "70vh",
      alignItems: "flex-end",
      justifyContent: "center",
    }}
  >
    {children}
  </Row>
));

class ProblemSetCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          values: this.generateItems(10), // array of arrays of values for each column in each question
        },
      ],
      currentQuestion: 0, // index of questions, determines which question to display
      selectedSorts: [""], // holds a number representing each sort for each question from questions
      problemSetName: "ProblemSetName",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let problemSetName = this.state.problemSetName;
    let questions = this.state.questions;
    let message;
    if (problemSetName === "" && questions.length === 0) {
      message = "Name the problem set and add some questions before submitting";
      alert(message);
      return null;
    } else if (problemSetName === "") {
      message = "Name the problem set before submitting";
      alert(message);
      return null;
    } else if (questions.length === 0) {
      message = "Add some questions before submitting";
      alert(message);
      return null;
    }

    // write to external file
  }

  handleCheck(event) {
    let index = this.state.currentQuestion;
    console.log(index);
    let sortId = event.target.id;
    console.log(typeof sortId);
    const selectedSorts = this.state.selectedSorts;
    selectedSorts[index] = sortId;
    console.log(this.state.selectedSorts);
    this.setState({
      selectedSorts: selectedSorts,
    });
    console.log(selectedSorts);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const questions = this.state.questions.slice();
    const values = questions[this.state.currentQuestion].values;
    questions[this.state.currentQuestion] = {
      values: arrayMoveImmutable(values, oldIndex, newIndex),
    };
    this.setState({
      questions: questions,
    });
  };

  generateItems(n) {
    const items = [];
    for (let i = 1; i <= n; i++) {
      let elemValue = Math.floor(Math.random() * 49 + 1);
      items.push(elemValue);
    }
    return items;
  }

  // called everytime a question is clicked and rendered (maybe???)
  // returns reordable bars in a container
  createBars(qNumber) {
    const valuesObj = this.state.questions[qNumber]; // returns value object in index qNumber
    if (this.state.questions.length === 0) {
      return null;
    }
    const values = valuesObj.values;
    return (
      <SortableContainer
        children={values.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            itemIndex={index}
            value={value}
            _height={String(Math.min(400, 30 + (value - 1) * 5)) + "px"}
            _width={"40px"}
            handleChange={this.handleChange}
          />
        ))}
        axis="x"
        onSortEnd={this.onSortEnd}
      ></SortableContainer>
    );
  }

  // handles selecting a question
  // qNumber is the question number i.e.
  // the index of the question that was clicked, in the state
  handleClick(qNumber) {
    console.log(qNumber);
    this.setState({
      currentQuestion: qNumber,
    });
  }

  // handles adding a new question
  handleAdd() {
    const questions = this.state.questions;
    const values = this.generateItems(10); // randomly generate values
    const selectedSorts = this.state.selectedSorts;
    this.setState({
      questions: questions.concat([
        {
          values: values, // add a new array in questions
        },
      ]),
      currentQuestion: questions.length, // update index to point to newly added question (last in the list)
      selectedSorts: selectedSorts.concat([""]),
    });
  }

  handleRemove(qNumber) {
    // remove values object from right index in questions
    const questions = this.state.questions.slice();
    const length = questions.length;
    let newIndex;
    if (this.state.currentQuestion >= qNumber) {
      // if q to be deleted is currently selected
      newIndex = length - 2; // select the previous question after this
    } else {
      newIndex = this.state.currentQuestion; // else just stay where you are
    }
    questions.splice(qNumber, 1);
    this.setState({
      questions: questions,
      currentQuestion: newIndex,
    });
  }

  handleChange(itemIndex, event) {
    // change the value of the right item in the currentQuestion values array
    const questions = this.state.questions.slice();
    const re = /^[0-9\b]+$/; // use this regexp to only allow numbers
    if (event.target.value === "" || re.test(event.target.value)) {
      let newValue = event.target.value;
      if (newValue > 999) {
        newValue = 999;
      }
      questions[this.state.currentQuestion].values[itemIndex] = newValue;
      this.setState({
        questions: questions,
      });
    }
  }

  handleNameChange(event) {
    let newValue = event.target.value;
    this.setState({
      problemSetName: newValue,
    });
  }

  render() {
    const questions = this.state.questions;
    return (
      <div>
        <Sidebar
          questions={questions}
          handleClick={this.handleClick}
          handleAdd={this.handleAdd}
          handleRemove={this.handleRemove}
          currentQuestion={this.state.currentQuestion}
          problemSetName={this.state.problemSetName}
          handleNameChange={this.handleNameChange}
        />
        <Container
          className="Editor"
          style={{
            width: "60%",
          }}
        >
          <Row>
            <SortSelection
              id="radioSorts"
              selectedSort={
                this.state.selectedSorts[this.state.currentQuestion]
              }
              handleCheck={this.handleCheck}
            />
          </Row>
          {this.createBars(this.state.currentQuestion)}
          <Submit handleSubmit={this.handleSubmit} />
        </Container>
      </div>
    );
  }
}

export default ProblemSetCreator;
