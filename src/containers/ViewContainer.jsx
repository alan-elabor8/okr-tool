import React, {Component} from 'react';
import Button from '../components/Button'
import OkrTable from '../components/OkrTable.jsx'
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from "react-table";
import 'react-table/react-table.css'

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

      const columns = [{
        Header: 'Id',
        accessor: 'id', // String-based value accessors!
        Cell: e =><a href={e.value}> {e.value} </a>
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
                Header: 'Objective Progress',
                accessor: 'progress',
                Cell: row => (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#dadada',
                      borderRadius: '2px'
                    }}
                  >
                    <div
                      style={{
                        width: `${row.value}%`,
                        height: '100%',
                        backgroundColor: row.value > 66 ? '#85cc00'
                          : row.value > 33 ? '#ffbf00'
                          : '#ff2e00',
                        borderRadius: '2px',
                        transition: 'all .2s ease-out'
                      }}
                    />
                  </div>
                )
              }
      ]


    return (


          <ReactTable data={this.state.okrs} columns={columns} defaultPageSize={5} />

        );
    }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default ViewContainer;