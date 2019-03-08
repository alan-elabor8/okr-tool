import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Link} from "react-router-dom";
import { Row } from 'react-bootstrap';
import Progress from '../components/Progress';

class ViewContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        okrs: [],
        newOkrs: []
    }

    }

async componentDidMount() {
  console.log("About to fetch all objectives", this.props)
  const response = await fetch('http://localhost:8080/okrs');
  const responseJson = await response.json();
  console.log("Sync Response", responseJson);
   this.setState({okrs: responseJson})
   console.log("Objectives saved in state: " , this.state.okrs);
   await this.calcProgress();
}



async calcProgress() {
  this.state.okrs.map(async (okr) =>  {
    console.log("Calc progress", okr.id)
    const keyResultResponse =  await fetch(`http://localhost:8080/keyresults?objectiveId=${okr.id}`);
    const keyResultJson =  await keyResultResponse.json();
    console.log("Got KeyResults", keyResultJson)

    let totalProgress = 0;
    let averageProgress = 0;
    const progressTotal = keyResultJson.map(result => {
      console.log("KeyResult Progress",  result.progress);
      totalProgress+=parseInt(result.progress, 10);
    })
    console.log("TotalProgress:" , totalProgress)
    averageProgress = totalProgress / keyResultJson.length
    console.log("Average Progress: ", averageProgress)
    okr.progress = averageProgress >= 0 ? averageProgress : 0

    this.setState( previousState => ({
      newOkrs: [ ...previousState.newOkrs, okr]
   }))
  } 

  )

}

 render() {

    console.log("OKRS3" , this.state.newOkrs);

      const columns = [{
        Header: 'Id',
        accessor: 'id', // String-based value accessors!
        Cell: ({ row }) => (<Link to={{ pathname: `/keyresults/${row.id}` }}>{row.id}</Link>)
      },
      {
        Header: 'Objective',
        accessor: 'objective' // String-based value accessors!
      },
        {
          Header: 'Benefit',
          accessor: 'benefit' // String-based value accessors!
        },
        {
          Header: 'Metric',
          accessor: 'metric' // String-based value accessors!
        },
        {
          Header: 'Target',
          accessor: 'target' // String-based value accessors!
        },
        {
          Header: 'Squad',
          accessor: 'squad'
        },
        {
                Header: 'Objective Progress',
                accessor: 'progress',
                Cell: row => (
                  <Progress value={row.value} />
                )
        }
      ]


    return (
                <ReactTable data={this.state.newOkrs} columns={columns} defaultPageSize={5} />
        );
    }
}

export default ViewContainer;