import { useEffect, useState } from 'react';
import { Container, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import ProblemSetCreator from './ProblemSetCreator';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
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
      try {
        const response = await axios.get('http://localhost:3001/problemset');
        setProblemSets(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const deleteHandler = (id) => {
    const deleteData = async (id) => {
      await axios.delete(`http://localhost:3001/problemset/${id}`);
    };
    deleteData(id);
    setProblemSets([...problemSets.slice(0, id), ...problemSets.slice(id + 1)]);
  };

  const listProblemSets = () => {
    return problemSets.map((item, index) => (
      <ListGroup.Item key={`problem-${index}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link style={linkStyle} to={`${index}`}>
          {item['title']}
        </Link>
        <span>
          <ButtonGroup size='sm'>
            <Button variant='primary'>Leaderboard</Button>
            <Button variant='danger' onClick={() => deleteHandler(index)}>
              Delete
            </Button>
          </ButtonGroup>
        </span>
      </ListGroup.Item>
    ));
  };

  const contentList = (
    <Container className='mx-5 my-3'>
      <Container>
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
      <Route path='/' element={contentList}></Route>
      <Route path='/:id/*' element={<ProblemSet />} />
      <Route path='/create' element={<ProblemSetCreator />} />
    </Routes>
  );
};

export default ProblemSetList;
