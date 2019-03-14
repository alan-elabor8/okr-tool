import React from 'react';
import {Link} from "react-router-dom";


function Navigation() {

    return (
 <div>
    <nav className="navbar navbar-expand-lg navbar-light  bg-light">
      <Link className="navbar-brand" to="/home">Home</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/createobjective">Create Objective</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/viewobjectives">View Objectives</Link>
        </li>
      </ul>
    </nav>
  </div>
    )

}


export default Navigation;