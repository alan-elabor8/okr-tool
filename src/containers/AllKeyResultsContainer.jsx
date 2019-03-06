import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {Link} from "react-router-dom";

class AllKeyResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
              keyresults: [],
              okrs: [],

              allResults: []
    }
    this.combineData = this.combineData.bind(this);
  }


async componentDidMount() {
      console.log("About to fetch all keyresults for objective", this.props)
      const response = await fetch(`http://localhost:8080/keyresults`);
      const responseJson = await response.json();
      console.log("Sync Response", responseJson);
       this.setState({keyresults: responseJson})
       console.log("KeyResults saved in state: " , this.state.keyresults);



    console.log("About to fetch all objectives")
    const okrResponse = await fetch('http://localhost:8080/okrs');
    const okrResponseJson = await okrResponse.json();
    console.log("Sync Response", okrResponseJson);
    console.log("Response", okrResponseJson);

        this.setState({okrs: okrResponseJson})
        console.log("Okrs saved in state: " , this.state.okrs);



     console.log("About to combine data");
     this.state.keyresults.map((keyresult) =>{
                 console.log("Obj ID", keyresult.objectiveId)
                 console.log("Obj for this Result", this.state.okrs[parseInt(keyresult.objectiveId,10)-1])
                 var okr = this.state.okrs[parseInt(keyresult.objectiveId,10)-1]
                 console.log("Obj for this Result", okr)

                 var allOkr = {
                    keyResultId : keyresult.id,
                    keyResult : keyresult.keyresult,
                    targetDate : keyresult.targetdate,
                    objectiveId : okr.id,
                    objective : okr.objective,
                    squad : keyresult.squad,
                    metric : okr.metric,
                    target : okr.target
                    }
                 console.log("allOkr ", allOkr)

                    this.setState( previousState => ({
                       allResults: [ ...previousState.allResults, allOkr]
                    }))

                 console.log("All results ", this.state.allResults)
                 }

     )
     console.log("Finished combine data");

}

combineData() {

         }


  render() {
  const columns = [{
        Header: 'Key Result Id',
        accessor: 'keyResultId', // String-based value accessors!
        width: '100'
      },
      {
        Header: 'Objective Id',
        accessor: 'objectiveId', // String-based value accessors!
        width: 'auto'
      },
      {
        Header: 'Key Result',
        accessor: 'keyResult', // String-based value accessors!
        width: 'auto'
      },
        {
          Header: 'Target Date',
          accessor: 'targetDate', // String-based value accessors!
        width: 'auto'
        },
        {
          Header: 'Squad',
          accessor: 'squad', // String-based value accessors!
        width: 'auto'
        },
        {
          Header: 'Metric',
          accessor: 'metric', // String-based value accessors!
          width: 'auto'
        },
        {
          Header: 'Target',
          accessor: 'target', // String-based value accessors!
          width: 'auto'
        }
  ]
    return(
        <div className="col-md-10">
            <h2>All Key Results</h2>
            <ReactTable data={this.state.allResults} columns={columns} defaultPageSize={10} />
        </div>
    );
  }

}

export default AllKeyResultsContainer;