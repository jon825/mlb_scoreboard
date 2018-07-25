import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ListOfGames from './ListOfGames';
import "../css/App.css";

class Heading extends Component {

  render() {
    return (
    <div>
      <nav className="row navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-dark bg-dark">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/standing" className="nav-link">Standing</Link>
            </li>

          </ul>
        </div>
      </nav>
    </div>
    );
  }
}

export default Heading;
