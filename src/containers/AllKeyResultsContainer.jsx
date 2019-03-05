import React, {Component} from 'react';
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Link} from "react-router-dom";

class AllKeyResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
              keyresults: []
    }
  }


componentDidMount() {
      console.log("About to fetch all keyresults for objective", this.props)
      fetch(`http://localhost:8080/keyresults`)
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
        width: 'auto'
      },
      {
        Header: 'Key Result',
        accessor: 'keyresult', // String-based value accessors!
        width: 'auto'
      },
        {
          Header: 'Target Date',
          accessor: 'targetdate', // String-based value accessors!
        width: 'auto'
        },
        {
          Header: 'Squad',
          accessor: 'squad', // String-based value accessors!
        width: 'auto'
        }
  ]
    return(
        <div className="col-md-6">
            <Link to='/home'>Home</Link>
            <h2>All Key Results</h2>
            <ReactTable data={this.state.keyresults} columns={columns} defaultPageSize={10} />
        </div>
    );
  }

}

export default AllKeyResultsContainer;