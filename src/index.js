import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';
import './styles/index.css';

import { AuthProvider } from './contexts/AuthContext';
import { InspectionProvider } from './contexts/InspectionContext';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <InspectionProvider>
        <App />
      </InspectionProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
