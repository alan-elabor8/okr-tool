import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import KeyResults from './containers/KeyResults';
import AllKeyResults from './containers/AllKeyResultsContainer';
import About from './modules/About';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './components/Navigation';

ReactDOM.render((
  <BrowserRouter>
  <div>
    <Route path="/home" component={App}/>
    <Route path="/about" component={About}/>
    <Route path="/keyresults/:id" component={KeyResults}/>
    <Route path="/allkeyresults/" component={AllKeyResults}/>
    </div>
  </BrowserRouter>
), document.getElementById('root'))


registerServiceWorker();
