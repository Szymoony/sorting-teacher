import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SinglePlay from './components/SinglePlay';
import ProblemSet from './components/ProblemSet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/practice' element={<SinglePlay />}></Route>
          <Route path='/problemset' element={<ProblemSet />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
