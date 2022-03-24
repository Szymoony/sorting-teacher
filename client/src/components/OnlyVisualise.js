import { Container, Row, Button, ProgressBar, Col } from 'react-bootstrap';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import Bar from './Bar';
import History from './History';

const SortableItem = sortableElement(({ value }) => {
  const _height = `${Math.min(400, 30 + (value - 1) * 5)}px`;
  return (
    <Bar height={_height} width={'40px'}>
      {value}
    </Bar>
  );
});

const SortableList = sortableContainer(({ items }) => {
  return (
    <Row
      style={{
        height: '50vh',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {items}
    </Row>
  );
});

const OnlyVisualise = (props) => {
  const { moveHandler, nextHandler, log, currentStep, list, algoType } = props;
  const createBars = () => {
    const percentage = (((currentStep - 1) / (log.length - 1)) * 100).toFixed(1);
    const sortaItems = list.map((item, index) => <SortableItem key={`item-${index}`} index={index} value={item} />);
    return (
      <Container>
        <Row>
          <SortableList onSortEnd={moveHandler} axis='x' items={sortaItems} />
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
    if (log.length === currentStep) {
      alert('Done');
      return;
    }
    if (JSON.stringify(list) === JSON.stringify(log[currentStep])) {
      nextHandler();
    } else {
      alert('Wrong Relocation!');
    }
  };

  return (
    <Row>
      <Col md={8}>{createBars()}</Col>
      <Col md={4}>
        <Container className='my-3'>
          <h1 style={{ fontSize: '20px' }}>History ({`${algoType.charAt(0).toUpperCase()}${algoType.slice(1)} Sort`})</h1>
          <History steps={log} id={currentStep} />
        </Container>
      </Col>
    </Row>
  );
};

export default OnlyVisualise;
