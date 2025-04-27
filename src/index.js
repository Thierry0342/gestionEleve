import React from 'react';
import ReactDOM from 'react-dom/client'; // pour la création du point d'entrée
import './index.css'; // pour appliquer ton CSS global
import App from './App'; // ton App.js principal
import reportWebVitals from './reportWebVitals'; // pour mesurer les performances (optionnel)

const root = ReactDOM.createRoot(document.getElementById('root')); // où ton app est injectée dans index.html
root.render(
  <React.StrictMode>
    <App/> 
  </React.StrictMode>
);

// Mesure de performance (tu peux laisser ça ou l'enlever si tu veux)
reportWebVitals();
