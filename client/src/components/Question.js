import Visualise from './Visualise';
import { useParams } from 'react-router-dom';

const Question = (props) => {
  const { qid } = useParams(props);
  const problem = props.problem;
  return <Visualise list={problem[qid]['list']} algoType={problem[qid]['algorithms']} />;
};

export default Question;
