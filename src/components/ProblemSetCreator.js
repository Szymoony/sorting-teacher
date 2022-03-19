import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Bar from "./Bar";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import Sidebar from "./Sidebar";

const SortableItem = sortableElement(({ value, _height, _width }) => (
  <Bar height={_height} width={_width}>
    {value}
  </Bar>
));

const SortableContainer = sortableContainer(({ children }) => (
  <Col xs={10}
    style={{
      height: "50vh",
      alignItems: "flex-end",
      justifyContent: "center",
    }}
  >
    {children}
  </Col>
));

class ProblemSetCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{
        values: this.generateItems(10)  // array of arrays of values for each column in each question
      }],  
      currentQuestion: 0  // index of questions, determines which question to display
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState(({ items }) => ({
    //   items: arrayMoveImmutable(items, oldIndex, newIndex),
    // }));
    const questions = this.state.questions.slice();
    const values = questions[this.state.currentQuestion].values;
    questions[this.state.currentQuestion] = {
      values: arrayMoveImmutable(values, oldIndex, newIndex),
    };
    this.setState({
      questions: questions
    });
  }

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
    const valuesObj = this.state.questions[qNumber];  // returns value object in index qNumber
    const values = valuesObj.values;
    return (
      <SortableContainer
        children={values.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            _height={String(Math.min(400, 30 + (value - 1) * 5)) + "px"}
            _width={"40px"}
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
      currentQuestion: qNumber
    });
  }

  // handles adding a new question
  handleAdd() {
    const questions = this.state.questions;
    const values = this.generateItems(10);  // randomly generate values
    this.setState({
      questions: questions.concat([
        {
          values: values  // add a new array in questions
        }
      ]),
      currentQuestion: questions.length - 1  // update index to point to newly added question (last in the list)
    });
  }

  handleRemove(qNumber) {
    // remove values object from right index in questions
    const questions = this.state.questions.slice();
    questions.splice(qNumber, 1);
    this.setState({
      questions: questions
    });
  }

  render() {
    const questions = this.state.questions;
    return (
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Sidebar
              questions={questions}
              handleClick={this.handleClick}
              handleAdd={this.handleAdd}
              handleRemove={this.handleRemove}
            />
          </Col>
          {this.createBars(this.state.currentQuestion)}
        </Row>
      </Container>
    )
  }
}

export default ProblemSetCreator;
