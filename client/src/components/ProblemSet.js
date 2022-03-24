import { Container, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './Quiz';

const ProblemSet = (props) => {
  const [mode, setMode] = useState('lobby');
  const [problem, setProblem] = useState({ title: '', problems: [] });
  const { id } = useParams(props);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/problemset/${id}`);
      setProblem(response.data);
    };
    fetchData();
  }, [id]);

  const listQuestions = (questions) => {
    const title = (algo, list) => {
      return `${algo.charAt(0).toUpperCase() + algo.slice(1)} Sort - ${JSON.stringify(list).replaceAll(',', ', ')}`;
    };
    return questions.map((item, i) => <ListGroup.Item key={i} as='li'>{title(item['algorithms'], item['list'])}</ListGroup.Item>);
  };

  let content = null;

  if (mode === 'lobby') {
    content = (
      <Container className='mx-5 my-3'>
        <h1>{problem['title']}</h1>
        <ListGroup as='ol' numbered>
          {listQuestions(problem['problems'])}
        </ListGroup>
        <Button variant='dark' className='mt-3' onClick={() => {setMode('inProgress')}}>
          Start!
        </Button>
      </Container>
    );
  } else if (mode === 'inProgress') {
    content = <Quiz problems={problem['problems']} />;
  }

  return content;
};

export default ProblemSet;
