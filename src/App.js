import React, { Component } from 'react';
import './App.css';
import Objectives from './containers/Objectives';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AllKeyResultsContainer from './containers/AllKeyResultsContainer'
import KeyResults from './containers/KeyResults'
import EditKeyResult from './containers/EditKeyResult';

class App extends Component {
  render() {
    return (
       <div className="col-md-10">
        <Navigation/>

        <Switch>
             <Route exact path='/home' component={Objectives} />
             <Route exact path='/allkeyresults' component={AllKeyResultsContainer} />
             <Route exact path='/keyresults/:id' component={KeyResults} />
             <Route exact path='/editkeyresult/:id' component={EditKeyResult} />
        </Switch>
        </div>

    );
  }
}

export default App;
