import React from 'react';
import ReactDOM from 'react-dom';
import { BroweserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BroweserRouter>
    , document.getElementById('root'));

registerServiceWorker();
