import { Container, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const linkStyle = { textDecoration: 'none', color: 'inherit', cursor: 'pointer' };

const ProblemSet = (props) => {
  const [problem, setProblem] = useState([]);
  const { id } = useParams(props);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/problemset');
      setProblem(response.data[id]);
    };
    fetchData();
  }, [id]);

  const listQuestions = () => {
    let list = [];
    const questions = problem['problems'];
    if (!questions) return;
    for (let i = 0; i < questions.length; i++) {
      list.push(
        <LinkContainer style={linkStyle} key={`question-${i}`} to={`${i}`}>
          <ListGroup.Item as='li'>{`${questions[i]['algorithms'].charAt(0).toUpperCase() + questions[i]['algorithms'].slice(1) + ' Sort'} - ${JSON.stringify(
            questions[i]['list']
          ).replaceAll(',', ', ')}`}</ListGroup.Item>
        </LinkContainer>
      );
    }
    return list;
  };

  return (
    <Container className='mt-5'>
      <h1>{problem['title']}</h1>
      <ListGroup as='ol' numbered>
        {listQuestions()}
      </ListGroup>
    </Container>
  );
};

export default ProblemSet;
