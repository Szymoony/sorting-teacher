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

const Quiz = (props) => {
  const [mode, SetMode] = useState('inProgress');
  const [qNum, setQNum] = useState(0);

  // visualation
  const question = props.problems[qNum];
  const [items, setItems] = useState(question['list'].slice());
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState([question['list'].slice()]);

  // timer
  const timerRef = useRef();

  useEffect(() => {
    setItems(question['list']);
    setCurrentStep(1);
    const getSteps = () => {
      const type = question['algorithms'];
      const copiedList = items.slice();
      if (type === 'bubble') {
        return bubbleSort(copiedList);
      } else if (type === 'insertion') {
        return insertionSort(copiedList);
      } else if (type === 'selection') {
        return selectionSort(copiedList);
      }
    };
    setSteps(getSteps());
  }, [qNum, question, items, props.problems.length]);

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
              log={steps}
              currentStep={currentStep}
              list={items}
              algoType={question['algorithms']}
            />
          </Col>
          <Col md={3}>
            {/* <Row>
              <StopWatch ref={timerRef} defaulttime={0} defaultactive={true} />
            </Row> */}
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
