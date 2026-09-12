import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { StoreProvider } from './context/StoreContext';
import './styles.css';
import './flagship.css';
import './visual-qa.css';
import './campaign.css';
import './commerce-v2.css';
import './brand-v3.css';
import './brand-v4.css';
import './final-v5.css';
import './final-v6.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
