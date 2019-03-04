import React, { Component } from 'react';
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';

import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'


class OkrTable extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
           <TableHeaderColumn dataField='objective'>
                      Objective
           </TableHeaderColumn>
          <TableHeaderColumn dataField='objectiveType'>
            Objective Type
          </TableHeaderColumn>
          <TableHeaderColumn dataField='benefit'>
            Benefit
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default OkrTable;