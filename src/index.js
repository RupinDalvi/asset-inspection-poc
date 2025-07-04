import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { AuthProvider } from './contexts/AuthContext';
import { InspectionProvider } from './contexts/InspectionContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <InspectionProvider>
        <BrowserRouter><App/></BrowserRouter>
      </InspectionProvider>
    </AuthProvider>
  </React.StrictMode>
);

