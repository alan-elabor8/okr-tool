import React, {Component} from 'react';
import SingleOKR from './SingleOKR';
import { withRouter } from 'react-router';
import {Link} from "react-router-dom";

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EnterKeyResult from './EnterKeyResult';

class KeyResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
          newKeyResult: {
            objectiveId: this.props.match.params.id,
            keyresult: '',
            targetdate: '',
            squad: ''
          },
          targetDate: new Date()

      }



  }







componentDidMount() {
      console.log("About to fetch objective data for objective", this.props.match.params.id)
      fetch(`http://54.252.237.254:8080/okrs/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("Response", responseJson);

          this.setState({okr: responseJson})
          console.log("Okrs saved in state: " , this.state.okr);

      })
}

render() {


    return (
        <div className="col-md-10">

        <div>KeyResults for {this.props.match.params.id}</div>
        <div>
          <Link to={`/enterkeyresult/${this.props.match.params.id}`}><b>Enter a new Key Result</b></Link>
          <SingleOKR id={this.props.match.params.id}/>
        </div>

        </div>
    );
}
}


export default withRouter(KeyResults);