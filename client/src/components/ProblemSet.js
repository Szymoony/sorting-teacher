import { Container, ListGroup } from 'react-bootstrap';
import { useParams, Routes, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const linkStyle = { textDecoration: 'none', color: 'inherit', cursor: 'pointer' };

const ProblemSet = (props) => {
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
    return questions.map((item, i) => (
      <LinkContainer style={linkStyle} key={`question-${i}`} to={`${i}`}>
        <ListGroup.Item as='li'>{title(item['algorithms'], item['list'])}</ListGroup.Item>
      </LinkContainer>
    ));
  };

  const content = (
    <Container className='mx-5 my-3'>
      <h1>{problem['title']}</h1>
      <ListGroup as='ol' numbered>
        {listQuestions(problem['problems'])}
      </ListGroup>
    </Container>
  );

  if (problem['problems'].length === 0) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <Routes>
        <Route path='/' element={content} />
        <Route path='/:qid' element={<Question problem={problem['problems']} />} />
      </Routes>
    );
  }
};

export default ProblemSet;
