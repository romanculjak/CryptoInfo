import React from 'react';
import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CoinDetail from './pages/CoinDetail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coin-details/:id' element={<CoinDetail/>} />
        <Route path='/*' element={<Home/>} />

      </Routes>
    </Router>
  );
}

export default App;
