import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from "react-router-dom";


function Navigation() {

    return (
 <div>
    <nav className="navbar navbar-expand-lg navbar-light  bg-light">
      <Link className="navbar-brand" to="/home">Home</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/allkeyresults">All Key Results</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/2">Page2</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/3">Page3</Link>
        </li>
      </ul>
    </nav>
  </div>
    )

}


export default Navigation;