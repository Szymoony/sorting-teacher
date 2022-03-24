import Visualise from './Visualise';
import Archieve from './Archieve';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

const Quiz = (props) => {
  const [qNum, setQNum] = useState(0);

  const question = props.problems[qNum];

  const buttonHander = () => {
    if (qNum + 1 <= props.problems.length) {
      setQNum(qNum + 1);
    }
  };

  if (qNum + 1 <= props.problems.length) {
    return (
      <Container>
        <Row className='my-5'>
          <Col
            md={9}
            style={{
              border: '1px solid black',
              height: 'calc(100vh - 170px)',
            }}
          >
            {<Visualise list={question['list']} algoType={question['algorithms']} />}
          </Col>
          <Col md={3}>
            <Button variant='info' type='submit' onClick={buttonHander}>
              {qNum + 1 === props.problems.length ? 'Finish' : 'Next Question'}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Archieve />;
  }
};

export default Quiz;
