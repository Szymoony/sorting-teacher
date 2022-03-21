import React from "react";
import { Form } from "react-bootstrap";

function SortSelection(props) {
  return (
    <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Bubble Sort"
            name="group1"
            type={type}
            id={0}
            onChange={props.handleCheck}
            checked={props.selectedSort === ''}
          />
          <Form.Check
            inline
            label="Selection Sort"
            name="group1"
            type={type}
            id={1}
            onChange={props.handleCheck}
            checked={props.selectedSort === '1'}
          />
          <Form.Check
            inline
            label="Insertion Sort"
            name="group1"
            type={type}
            id={2}
            onChange={props.handleCheck}
            checked={props.selectedSort === '2'}
          />
          <Form.Check
            inline
            label="Merge Sort"
            name="group1"
            type={type}
            id={3}
            onChange={props.handleCheck}
            checked={props.selectedSort === '3'}
          />
          <Form.Check
            inline
            label="Quick Sort"
            name="group1"
            type={type}
            id={4}
            onChange={props.handleCheck}
            checked={props.selectedSort === '4'}
          />
          <Form.Check
            inline
            label="Heap Sort"
            name="group1"
            type={type}
            id={5}
            onChange={props.handleCheck}
            checked={props.selectedSort === '5'}
          />
        </div>
      ))}
    </Form>
  )
}

export default SortSelection;
