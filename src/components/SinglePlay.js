import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Visualise from "./Visualise";

class SinglePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "select",
      list: [],
    };
  }

  render() {
    const form =
      (<Form onSubmit={this.validate.bind(this)}>
        <Row>
          <Col className="m-5">
            <Form.Group as={Row} controlId="formGridAlgorithms">
              <Form.Label>Select algorithms</Form.Label>
              <Form.Select>
                <option>Bubble Sort</option>
                <option>Insertion Sort</option>
                <option>Selection Sort</option>
                <option>Merge Sort</option>
                <option>Quick Sort</option>
                <option>Heap Sort</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col className="m-5">
            <Form.Group as={Row} controlId="formGridList">
              <Form.Label>List</Form.Label>
              <Form.Control ref={(ref) => this.listRef = ref} placeholder="[3, 2, 4, 1, 5]" />
            </Form.Group>
          </Col>

          <Col className="m-5">
            <Form.Group as={Row} controlId="formGridButton">
              <Form.Label>Random list with length of 5</Form.Label>
              <Button variant="primary" onClick={this.generateRandomList.bind(this)}>Random List</Button>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form >);
    let display_type = null;
    switch (this.state.mode) {
      case "select":
        display_type = form;
        break;
      case "play":
        display_type = <Visualise list={this.state.list} />;
        break;
      default:
        break;
    }

    return display_type;
  }

  generateRandomList() {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push(Math.floor(Math.random() * 50 + 1));
    }
    this.setState({ list: list });
    this.listRef.value = '[' + list.toString().replaceAll(',', ', ') + ']';
  }

  validate() {
    if (!this.listRef.value) {
      // TODO: validate the input
      alert("Please");
    } else {
      this.setState({ mode: "play" });
    }
  }
}

export default SinglePlay;