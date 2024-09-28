import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './AppContext';
import reportWebVitals from './reportWebVitals';
import './uicons/uicons-bold-rounded/uicons-bold-rounded/css/uicons-bold-rounded.css';
import './uicons/uicons-regular-rounded/uicons-regular-rounded/css/uicons-regular-rounded.css';
import './uicons/uicons-solid-rounded/uicons-solid-rounded/css/uicons-solid-rounded.css';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
       <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();