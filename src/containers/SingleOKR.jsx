import React, {Component} from 'react';
import KeyResultsContainer from './KeyResultsContainer';

class SingleOKR extends Component {
  constructor(props) {
    super(props);
    this.state = {
              okr: {
              }
          }
  }


componentDidMount() {
      console.log("About to fetch data for single objective ", this.props.id)
      fetch(`http://localhost:8080/okrs/${this.props.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("Response", responseJson);

          this.setState({okr: responseJson})
          console.log("Okrs saved in state: " , this.state.okr);

      })
}

  render() {

    return(
        <div>
        <hr/>
            <h3>Objective</h3>
            <div>Objective ID: {this.props.id}</div>
            <div>Objective: {this.state.okr.objective}</div>
            <div>Benefit: {this.state.okr.benefit}</div>
            <div>ObjectiveType: {this.state.okr.objectiveType}</div>
            <div>Metric: {this.state.okr.metric}</div>
            <h4>Key Results</h4>
            <KeyResultsContainer objectiveId={this.props.id}/>
        <hr/>
        </div>
    );
  }

}

export default SingleOKR;