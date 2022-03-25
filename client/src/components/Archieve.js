import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import StopWatch from './StopWatch/StopWatch';

const inputStyle = {
  height: '200px',
  width: '600px',
  fontSize: '50px',
  textAlign: 'center',
};

const saveRecord = async (id, username, ) => {
  // try {
  //   await axios.post(`http://localhost:3001/problemset/leaderboard/${id}`, {
  //     name: 
  //     problems: listProblems,
  //   });
  //   window.location.href = '/problemset';
  // } catch (e) {
  //   console.log(e, 'creation error');
  // }
};

const Archieve = (props) => {
  return (
    <div>
      <StopWatch defaulttime={props.record} defaultactive={false} />
      <Container className='mt-3'>
        <Row className='justify-content-md-center'>
          <Form.Control style={inputStyle} size='lg' type='text' placeholder='Name' maxlength='30' />
        </Row>
        <Row className='justify-content-md-center mt-3'>
          <Col xs lg='2'>
            <Button variant='outline-success' onClick={saveRecord}>
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
