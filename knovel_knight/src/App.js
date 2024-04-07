import './App.css';
import Navbar from './Navbar';
import Leaderboard from './pages/Leaderboard';
import Events from './pages/Events';
import Books from './pages/Books';
import Home from './pages/Home';
import Register from './pages/Register';
import ReviewFiendishCodex from './pages/CatinTheHat';
import { Route, Routes } from 'react-router-dom';
import Board from './pages/components/Board';
import Banner from './pages/components/Banner';
import CatinTheHat from './pages/CatinTheHat';

function App() {
  return (
    <>
    <Banner></Banner>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events" element={<Events />} /> 
          <Route path='/register' element={<Register />} />
          <Route path='/CatintheHat' element={<CatinTheHat />} />
        </Routes>
        {/* <Register /> */}
      </div>
    </>
  );
}

export default App;
