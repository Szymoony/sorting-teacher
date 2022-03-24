import React, { Component } from 'react';
import { Container, Row, Button, ProgressBar, Col } from 'react-bootstrap';
import Bar from './Bar';
import History from './History';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { bubbleSort, insertionSort, selectionSort } from '../assets/Sorting';

const SortableItem = sortableElement(({ value, _height, _width }) => (
  <Bar height={_height} width={_width}>
    {value}
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

class Visualise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.list.slice(),
      currentStep: 1,
    };
    this.steps = this.updateSteps();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  createBars() {
    const { items } = this.state;
    const percentage = (((this.state.currentStep - 1) / (this.steps.length - 1)) * 100).toFixed(1);
    return (
      <Container>
        <Row>
          <SortableContainer
            children={items.map((value, index) => (
              <SortableItem key={`item-${index}`} index={index} value={value} _height={`${Math.min(400, 30 + (value - 1) * 5)}px`} _width={'40px'} />
            ))}
            axis='x'
            onSortEnd={this.onSortEnd}
          ></SortableContainer>
        </Row>
        <Row className='justify-content-md-center mt-3'>
          <Col lg='7'>
            <ProgressBar now={percentage} label={`${percentage}%`} />
          </Col>
          <Col lg='1'>
            <Button variant='outline-dark' onClick={this.validate.bind(this)}>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <Row>
        <Col md={8}>{this.createBars()}</Col>
        <Col md={4}>
          <Container className='my-3'>
            <h1 style={{ fontSize: '20px' }}>History ({this.props.algoType.charAt(0).toUpperCase() + this.props.algoType.slice(1) + ' Sort'})</h1>
            <History steps={this.steps} id={this.state.currentStep} />
          </Container>
        </Col>
      </Row>
    );
  }

  updateSteps() {
    const type = this.props.algoType;
    const copiedList = this.props.list.slice();
    if (type === 'bubble') {
      return bubbleSort(copiedList);
    } else if (type === 'insertion') {
      return insertionSort(copiedList);
    } else if (type === 'selection') {
      return selectionSort(copiedList);
    }
  }

  validate() {
    const items = this.state.items;
    const count = this.state.currentStep;
    if (this.steps.length === this.state.currentStep) {
      alert('Done');
      return;
    }
    if (JSON.stringify(items) === JSON.stringify(this.steps[count])) {
      this.setState({ currentStep: this.state.currentStep + 1 }, () => {
        if (this.steps.length === this.state.currentStep) {
          alert('Done');
        }
      });
    } else {
      alert('Wrong Relocation!');
    }
  }
}

export default Visualise;
