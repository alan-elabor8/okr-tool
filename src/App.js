import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OkrContainer from './containers/OkrContainer';
import FormContainer from './containers/FormContainer';
import ViewContainer from './containers/ViewContainer';

class App extends Component {
  render() {
    return (
      <div className="col-md-10">
        <h3> OKR Container </h3>
        <OkrContainer />
        <ViewContainer />
      </div>
    );
  }
}

export default App;
