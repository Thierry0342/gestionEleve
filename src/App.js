import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/index';
import HomePage from './pages/homePage'; 
import ElevePage from './pages/ElevePage/ElevePage';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eleve" element={<ElevePage />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
