import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import axios from 'axios';
import { randomListNoDup } from '../assets/RandomItems';
import Bar from './Bar';
import Sidebar from './Sidebar';
import SortSelection from './SortSelection';
import Submit from './Submit';
import '../assets/ProblemSetCreator.css';

const SortableItem = sortableElement(({ index, itemIndex, value, _height, _width, handleChange, handleRemoveBar }) => (
  <Bar className='Bar' height={_height} width={_width}>
    <input id='value' value={value} onChange={(e) => handleChange(itemIndex, e)} />
    <button className='removeBar' onClick={() => handleRemoveBar(itemIndex)}>
      x
    </button>
  </Bar>
));

const SortableContainer = sortableContainer(({ children }) => (
  <Row
    style={{
      height: '50vh',
      alignItems: 'flex-end',
      justifyContent: 'center',
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
          values: randomListNoDup(50, 7), // array of arrays of values for each column in each question
        },
      ],
      currentQuestion: 0, // index of questions, determines which question to display
      selectedSorts: ['bubble'], // holds a string representing each sort for each question from questions
      problemSetName: 'ProblemSetName',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveBar = this.handleRemoveBar.bind(this);
    this.handleAddBar = this.handleAddBar.bind(this);
  }

  // handles the user removing a bar from a question in the problem set
  handleRemoveBar(itemIndex) {
    const questions = this.state.questions.slice();
    const valuesObj = questions[this.state.currentQuestion];
    if (valuesObj.values.length === 3) {
      // min
      return null;
    }
    valuesObj.values.splice(itemIndex, 1);
    this.setState({
      questions: questions,
    });
  }

  // handles adding a new bar to a question
  handleAddBar() {
    const questions = this.state.questions.slice();
    const valuesObj = questions[this.state.currentQuestion];
    if (valuesObj.values.length === 12) {
      // min
      return null;
    }
    valuesObj.values.push(this.generateItems(1));
    this.setState({
      questions: questions,
    });
  }

  // handles the user submitting the problem set
  async handleSubmit() {
    let problemSetName = this.state.problemSetName;
    let questions = this.state.questions;
    let message = '';

    if (problemSetName === '') {
      message += 'Name the problem set before submitting\n';
    }
    if (questions.length === 0) {
      message += 'Add some questions before submitting\n';
    }

    if (message !== '') {
      alert(message);
      return null;
    }

    let listProblems = [];
    this.state.questions.map((item, index) => listProblems.push({ algorithms: this.state.selectedSorts[index], list: item['values'] }));

    try {
      await axios.post('http://localhost:3001/problemset/create', {
        title: this.state.problemSetName,
        problems: listProblems,
      });
      window.location.href = '/problemset';
    } catch (e) {
      console.log(e, 'creation error');
    }
  }

  // handles the user selecting a sorting algorithm
  handleCheck(event) {
    let index = this.state.currentQuestion;
    let sortId = event.target.id;
    const selectedSorts = this.state.selectedSorts;
    selectedSorts[index] = sortId;
    this.setState({
      selectedSorts: selectedSorts,
    });
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
        children={values
          .map((value, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              itemIndex={index}
              value={value}
              _height={String(Math.min(400, 30 + (value - 1) * 5)) + 'px'}
              _width={'40px'}
              handleChange={this.handleChange}
              handleRemoveBar={this.handleRemoveBar}
            />
          ))
          .concat(
            <button key='plusbutton' id='addBar' onClick={this.handleAddBar}>
              +
            </button>
          )}
        axis='x'
        onSortEnd={this.onSortEnd}
      />
    );
  }

  // handles selecting a question
  // qNumber is the question number i.e.
  // the index of the question that was clicked, in the state
  handleClick(qNumber) {
    this.setState({
      currentQuestion: qNumber,
    });
  }

  // handles adding a new question
  handleAdd() {
    const questions = this.state.questions;
    const values = randomListNoDup(50, 7); // randomly generate values
    const selectedSorts = this.state.selectedSorts;
    this.setState({
      questions: questions.concat([
        {
          values: values, // add a new array in questions
        },
      ]),
      currentQuestion: questions.length, // update index to point to newly added question (last in the list)
      selectedSorts: selectedSorts.concat(['bubble']),
    });
  }

  // handles removing a question from the problem set
  handleRemove(qNumber) {
    // remove values object from right index in questions
    const questions = this.state.questions.slice();
    const selectedSorts = this.state.selectedSorts.slice();
    const length = questions.length;
    let newIndex;
    if (this.state.currentQuestion >= qNumber) {
      // if q to be deleted is currently selected
      newIndex = length - 2; // select the previous question after this
    } else {
      newIndex = this.state.currentQuestion; // else just stay where you are
    }
    questions.splice(qNumber, 1);
    selectedSorts.splice(qNumber, 1);

    this.setState({
      questions: questions,
      currentQuestion: newIndex,
      selectedSorts: selectedSorts,
    });
  }

  // handles changing the input box on bars
  handleChange(itemIndex, event) {
    // change the value of the right item in the currentQuestion values array
    const questions = this.state.questions.slice();
    const re = /^[0-9\b]+$/; // use this regexp to only allow numbers
    if (event.target.value === '' || re.test(event.target.value)) {
      let newValue = event.target.value;
      if (newValue > 50) {
        newValue = 50;
      }
      if (!newValue) {
        // change to 0 if nothing
        newValue = 0;
      }
      if (newValue[0] === '0') {
        // if first digit is 0, automatically remove
        newValue = newValue.substring(1);
      }
      questions[this.state.currentQuestion].values[itemIndex] = newValue;
      this.setState({
        questions: questions,
      });
    }
  }

  // handles changing the name of the problem set
  handleNameChange(event) {
    let newValue = event.target.value;
    this.setState({
      problemSetName: newValue,
    });
  }

  render() {
    const questions = this.state.questions;
    const sortSelect =
      questions.length === 0 ? null : ( // sortSelect only displays radio inputs if there is at least 1 question
        <SortSelection id='radioSorts' selectedSort={this.state.selectedSorts[this.state.currentQuestion]} handleCheck={this.handleCheck} />
      );

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
        <Container className='Editor' style={{ width: '60%' }}>
          <Row className='mt-3'>{sortSelect}</Row>
          {this.createBars(this.state.currentQuestion)}
          <Submit handleSubmit={this.handleSubmit} />
        </Container>
      </div>
    );
  }
}

export default ProblemSetCreator;
