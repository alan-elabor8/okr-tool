import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import KeyResults from './containers/KeyResults';
import AllKeyResults from './containers/AllKeyResultsContainer';
import About from './modules/About';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'


ReactDOM.render((
<div>

  <BrowserRouter>

    <App/>
  </BrowserRouter>
  </div>
), document.getElementById('root'))


registerServiceWorker();
