import React, { Component } from 'react';
import './App.css';
import OkrContainer from './containers/OkrContainer';
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
