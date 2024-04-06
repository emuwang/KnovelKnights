import './App.css';
import Navbar from './Navbar';
import Leaderboard from './pages/Leaderboard';
import Events from './pages/Events';
import Books from './pages/Books';
import Home from './pages/Home';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import Board from './pages/components/Board';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events" element={<Events />} /> 
        </Routes>
        {/* <Register /> */}
      </div>
    </>
  );
}

export default App;
