import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SinglePlay from './components/SinglePlay';
import ProblemSetList from './components/ProblemSetList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/practice' element={<SinglePlay />} />
          <Route path='/problemset/*' element={<ProblemSetList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
