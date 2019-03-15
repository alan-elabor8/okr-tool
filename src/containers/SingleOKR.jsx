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
      fetch(`http://54.252.237.254:8080/okrs/${this.props.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("Response", responseJson);

          this.setState({okr: responseJson})
          console.log("Okrs saved in state: " , this.state.okr);

      })
}

getLocalDate(date) {
  var dateToPrint = new Date(date).toLocaleDateString()
  return dateToPrint
}

  render() {
    var startDate = this.state.okr.startdate
    var dateToPrint = new Date(startDate).toLocaleDateString()
    console.log("Start Date:", dateToPrint)
    return(
        <div>
        <hr/>
            <h3>Objective</h3>

            <table>
                <tbody>
                    <tr>
                        <th>Objective ID:</th>
                        <td>{this.props.id}</td>
                        <th>Objective:</th>
                        <td>{this.state.okr.objective}</td>
                        <th>Recognition Profile:</th>
                        <td>{this.state.okr.recognitionProfile}</td>
                    </tr>
                    <tr>
                        <th>Benefit:</th>
                        <td>{this.state.okr.benefit}</td>
                        <th>ObjectiveType:</th>
                        <td>{this.state.okr.objectiveType}</td>
                        <th>Metric:</th>
                        <td>{this.state.okr.metric}</td>
                    </tr>
                    <tr>
                        <th>Target:</th>
                        <td>{this.state.okr.target}</td>
                        <th>Star Date:</th>
                        <td>{this.getLocalDate(this.state.okr.startdate)}</td>
                        <th>End Date:</th>
                        <td>{this.getLocalDate(this.state.okr.enddate)}</td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            <h4>Key Results</h4>
            <KeyResultsContainer objectiveId={this.props.id}/>
        <hr/>
        </div>
    );
  }

}

export default SingleOKR;