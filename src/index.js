import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap the App component with BrowserRouter only here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
