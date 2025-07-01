import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="home"><h1>APOCAL’IPSSI</h1></div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<div>Déconnexion</div>} />
      </Routes>
    </Router>
  );
}

export default App;
