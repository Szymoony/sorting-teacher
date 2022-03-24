import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard.js';

const Leaders = (props) => {
  const [users, setUsers] = useState([]);
  const [paginate, setPaginate] = useState(10);
  const { id } = useParams(props);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/problemset/leaderboard/${id}`);
      setUsers(response.data);
    };
    fetchData();
  }, [id]);

  if (users.length === 0) return <div>No data...</div>;

  return (
    <div className='mx-3'>
      <Leaderboard users={users} paginate={paginate} problemSetName={'ProblemSet1'} />
    </div>
  );
};

export default Leaders;
