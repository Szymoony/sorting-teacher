import React, { useState, useRef } from 'react';
import { Container, Row, Button, ProgressBar, Col } from 'react-bootstrap';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import Bar from './Bar';
import History from './History';
import { bubbleSort, insertionSort, selectionSort } from '../assets/Sorting';

const SortableItem = sortableElement(({ value, _width }) => {
  const height = `${Math.min(400, 30 + (value - 1) * 5)}px`;
  return (
    <Bar height={height} width={_width}>
      {value}
    </Bar>
  );
});

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

const Visualise = (props) => {
  const [items, setItems] = useState(props.list.slice());
  const [currentStep, setCurrentStep] = useState(1);

  const getSteps = () => {
    const type = props.algoType;
    const copiedList = props.list.slice();
    if (type === 'bubble') {
      return bubbleSort(copiedList);
    } else if (type === 'insertion') {
      return insertionSort(copiedList);
    } else if (type === 'selection') {
      return selectionSort(copiedList);
    }
  };

  const steps = useRef(getSteps());

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  const createBars = () => {
    const percentage = (((currentStep - 1) / (steps.current.length - 1)) * 100).toFixed(1);
    return (
      <Container>
        <Row>
          <SortableContainer
            children={items.map((value, index) => (
              <SortableItem key={`item-${index}`} index={index} value={value} _width='40px' />
            ))}
            axis='x'
            onSortEnd={onSortEnd}
          ></SortableContainer>
        </Row>
        <Row className='justify-content-md-center mt-3'>
          <Col lg='7'>
            <ProgressBar now={percentage} label={`${percentage}%`} />
          </Col>
          <Col lg='1'>
            <Button variant='outline-dark' onClick={validate}>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  const validate = () => {
    if (steps.current.length === currentStep) {
      alert('Done');
      return;
    }
    if (JSON.stringify(items) === JSON.stringify(steps.current[currentStep])) {
      setCurrentStep(currentStep + 1);
      if (steps.current.length === currentStep) {
        alert('Done');
      }
    } else {
      alert('Wrong Relocation!');
    }
  };

  return (
    <Row>
      <Col md={8}>{createBars()}</Col>
      <Col md={4}>
        <Container className='my-3'>
          <h1 style={{ fontSize: '20px' }}>History ({props.algoType.charAt(0).toUpperCase() + props.algoType.slice(1) + ' Sort'})</h1>
          <History steps={steps.current} id={currentStep} />
        </Container>
      </Col>
    </Row>
  );
};

export default Visualise;
