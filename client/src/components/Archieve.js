import { useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StopWatch from './StopWatch/StopWatch';

const inputStyle = {
  height: '200px',
  width: '600px',
  fontSize: '50px',
  textAlign: 'center',
};

const saveRecord = async (id, username, score) => {
  try {
    await axios.post(`http://localhost:3001/problemset/${id}`, {
      name: username,
      score: score,
    });
    window.location.href = '/problemset';
  } catch (e) {
    console.log(e, 'creation error');
  }
};

const IDEAL_TIME_PER_QUESTION = 1000000;

const Archieve = (props) => {
  const { id } = useParams(props);
  const score = Math.round((IDEAL_TIME_PER_QUESTION * props.numQ) / props.record);
  console.log("Time taken", props.record);
  const textRef = useRef();

  return (
    <div>
      <StopWatch defaulttime={props.record} defaultactive={false} />
      <Container className='mt-3'>
        <Row className='justify-content-md-center'>
          <Form.Control ref={textRef} style={inputStyle} size='lg' type='text' placeholder='Name' maxLength='30' />
        </Row>
        <Row className='justify-content-md-center mt-3'>
          <Col xs lg='2'>
            <Button variant='outline-success' onClick={() => saveRecord(id, textRef.current.value, score)}>
              Register Your Record!
            </Button>
          </Col>
          <Col xs lg='2'>
            <Button variant='outline-dark' onClick={() => (window.location.href = '/problemset')}>
              Discard the Record
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Archieve;
