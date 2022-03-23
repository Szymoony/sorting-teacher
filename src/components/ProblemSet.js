import { Container, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import ProblemSetCreator from './ProblemSetCreator';
import '../assets/Sidebar.css';

function ProblemSet() {
  const [mode, setMode] = useState('list');

  const contentList = (
    <Container>
      <Container className='mt-5'>
        <h1>List of problem sets</h1>
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Container>
      <button
        onClick={() => setMode('create')}
        className='mt-3'
        style={{
          backgroundColor: 'white',
          border: '2px solid #1a1a1a',
          borderRadius: '15px',
          color: '#3b3b3b',
          display: 'block',
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: 'normal',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          width: '190px',
        }}
      >
        + Create Problem Set
      </button>
    </Container>
  );

  if (mode === 'list') {
    return contentList;
  } else if (mode === 'create') {
    return <ProblemSetCreator />;
  }
}

export default ProblemSet;
