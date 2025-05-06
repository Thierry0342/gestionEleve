import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/index';
import HomePage from './pages/HomePge/homePage'; 
import ElevePage from './pages/ElevePage/ElevePage';
import ListeElevePge from './pages/ListeEleve/ListeElevePage';
import CourPage from './pages/CourPage/CourPage';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eleve" element={<ElevePage />} />
          <Route path="/eleve/listeEleveGendarme" element={<ListeElevePge />} />
          <Route path="/admin/" element={<CourPage />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
