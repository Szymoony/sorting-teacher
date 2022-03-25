import { useState, useEffect, useRef } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { bubbleSort, insertionSort, selectionSort } from '../assets/Sorting';
import OnlyVisualise from './OnlyVisualise';
import Archieve from './Archieve';
import StopWatch from './StopWatch/StopWatch';

const borderStyle = {
  border: '1px solid black',
  height: 'calc(100vh - 170px)',
};

const getSteps = (items, type) => {
  const copiedList = items.slice();
  if (type === 'bubble') {
    return bubbleSort(copiedList);
  } else if (type === 'insertion') {
    return insertionSort(copiedList);
  } else if (type === 'selection') {
    return selectionSort(copiedList);
  }
};

const Quiz = (props) => {
  const [mode, SetMode] = useState('inProgress');
  const [qNum, setQNum] = useState(0);

  // visualation
  const [items, setItems] = useState(props.problems[qNum]['list']);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = useRef(getSteps(props.problems[qNum]['list'], props.problems[qNum]['algorithms']));

  // timer
  const timerRef = useRef();

  useEffect(() => {
    steps.current = getSteps(props.problems[qNum]['list'], props.problems[qNum]['algorithms']);
    setCurrentStep(1);
  }, [qNum]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const buttonHander = () => {
    if (qNum + 1 < props.problems.length) {
      setQNum(qNum + 1);
    } else {
      console.log('Time is', timerRef.current.handleReset());
      SetMode('done');
    }
  };

  if (mode === 'inProgress') {
    return (
      <Container>
        <Row className='my-5'>
          <Col md={9} style={borderStyle}>
            <OnlyVisualise
              moveHandler={onSortEnd}
              nextHandler={nextStep}
              log={steps.current}
              currentStep={currentStep}
              list={items}
              algoType={props.problems[qNum]['algorithms']}
            />
          </Col>
          <Col md={3}>
            <Row>
              <StopWatch ref={timerRef} defaulttime={0} defaultactive={true} />
            </Row>
            <Row>
              <Button variant='info' type='submit' onClick={buttonHander}>
                {qNum + 1 === props.problems.length ? 'Finish' : 'Next Question'}
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } else if (mode === 'done') {
    return <Archieve record={timerRef.current.getTime()} />;
  }
};

export default Quiz;
