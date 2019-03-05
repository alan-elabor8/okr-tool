import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class KeyResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
              keyresults: []
    }
  }


componentDidMount() {
      console.log("About to fetch keyresults for objective", this.props)
      fetch(`http://localhost:8080/keyresults?objectiveId=${this.props.objectiveId}`)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("Response", responseJson);

          this.setState({keyresults: responseJson})
          console.log("KeyResults saved in state: " , this.state.keyresults);

      })
}

  render() {

  const columns = [{
        Header: 'Id',
        accessor: 'id', // String-based value accessors!
      },
      {
        Header: 'Key Result',
        accessor: 'keyresult' // String-based value accessors!
      },
        {
          Header: 'Target Date',
          accessor: 'targetdate' // String-based value accessors!
        },
        {
          Header: 'Squad',
          accessor: 'squad' // String-based value accessors!
        }
  ]
    return(
        <ReactTable data={this.state.keyresults} columns={columns} defaultPageSize={5} />
    );
  }

}

export default KeyResultsContainer;