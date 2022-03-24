import { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import ProblemSetCreator from './ProblemSetCreator';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import ProblemSet from './ProblemSet';

const plusButtonStyle = {
  appearance: 'none',
  backgroundColor: 'white',
  border: '2px solid #1a1a1a',
  borderRadius: '15px',
  color: '#3b3b3b',
  display: 'block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: 'normal',
  margin: 0,
  textDecoration: 'none',
  textAlign: 'center',
  userSelect: 'none',
  width: '190px',
};

const linkStyle = { textDecoration: 'none', color: 'inherit', cursor: 'pointer' };

const ProblemSetList = () => {
  const [problemSets, setProblemSets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/problemset');
      setProblemSets(response.data);
    };
    fetchData();
  }, []);

  const listProblemSets = () => {
    let list = [];
    for (let i = 0; i < problemSets.length; i++) {
      list.push(
        <LinkContainer style={linkStyle} key={`problem-${i}`} to={`${i}`}>
          <ListGroup.Item>{problemSets[i]['title']}</ListGroup.Item>
        </LinkContainer>
      );
    }
    return list;
  };

  const contentList = (
    <Container>
      <Container className='mt-5'>
        <h1>List of Problem Sets</h1>
        <ListGroup>{listProblemSets()}</ListGroup>
      </Container>
      <Link to='create' style={linkStyle}>
        <button className='mt-3' style={plusButtonStyle}>
          + Create Problem Set
        </button>
      </Link>
    </Container>
  );

  return (
    <Routes>
      <Route path='/' element={contentList} />
      <Route path='/:id' element={<ProblemSet />} />
      <Route path='/create' element={<ProblemSetCreator />} />
    </Routes>
  );
};

export default ProblemSetList;
