import React from "react";
import { Form } from "react-bootstrap";

function SortSelection(props) {
  return (
    <Form>
      {["radio"].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Bubble Sort"
            name="group1"
            type={type}
            id="bubble"
            onChange={props.handleCheck}
            checked={props.selectedSort === "bubble"}
          />
          <Form.Check
            inline
            label="Selection Sort"
            name="group1"
            type={type}
            id="selection"
            onChange={props.handleCheck}
            checked={props.selectedSort === "selection"}
          />
          <Form.Check
            inline
            label="Insertion Sort"
            name="group1"
            type={type}
            id="insertion"
            onChange={props.handleCheck}
            checked={props.selectedSort === "insertion"}
          />
          <Form.Check
            inline
            label="Merge Sort"
            name="group1"
            type={type}
            id="merge"
            onChange={props.handleCheck}
            checked={props.selectedSort === "merge"}
          />
          <Form.Check
            inline
            label="Quick Sort"
            name="group1"
            type={type}
            id="quick"
            onChange={props.handleCheck}
            checked={props.selectedSort === "quick"}
          />
          <Form.Check
            inline
            label="Heap Sort"
            name="group1"
            type={type}
            id="heap"
            onChange={props.handleCheck}
            checked={props.selectedSort === "heap"}
          />
        </div>
      ))}
    </Form>
  );
}

export default SortSelection;
