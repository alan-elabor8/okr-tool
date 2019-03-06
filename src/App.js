import React, { Component } from 'react';
import './App.css';
import Objectives from './containers/Objectives';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AllKeyResultsContainer from './containers/AllKeyResultsContainer'
import KeyResults from './containers/KeyResults'

class App extends Component {
  render() {
    return (
       <div className="col-md-10">
        <Navigation/>

        <Switch>
             <Route exact path='/home' component={Objectives} />
             <Route exact path='/allkeyresults' component={AllKeyResultsContainer} />
             <Route exact path='/keyresults/:id' component={KeyResults} />
        </Switch>
        </div>

    );
  }
}

export default App;
