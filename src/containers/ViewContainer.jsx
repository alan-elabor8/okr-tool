import React, {Component} from 'react';
import Button from '../components/Button'
import OkrTable from '../components/OkrTable.jsx'
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';

class ViewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        okrs: []
    }

    }


componentDidMount() {
    console.log("About to fetch data")
    fetch('http://localhost:8080/okrs')
    .then((response) => response.json())
    .then((responseJson) => {
        console.log("Response", responseJson);

        this.setState({okrs: responseJson})
        console.log("Okrs saved in state: " , this.state.okrs);

    })
}



render() {
    console.log("OKRS3" , this.state.okrs);
    return (
          <div className="App">
            <p className="Table-header">OKR List</p>
            <OkrTable data={this.state.okrs}/>
          </div>
        );
    }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default ViewContainer;