import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OkrContainer from './containers/OkrContainer';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3> OKR Container </h3>
        <OkrContainer />
      </div>
    );
  }
}

export default App;
