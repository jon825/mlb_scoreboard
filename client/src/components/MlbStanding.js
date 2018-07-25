import React, { Component } from "react";
import Heading from "./Heading";
import AmericanLeague from "./AmericanLeague";
import NationalLeague from "./NationalLeague";
import axios from "axios";

import "../css/App.css";

class MlbStanding extends Component {
  constructor() {
    super();
    this.state = {
      page: "AlStanding",
      NLStanding: [],
      AlStanding: []
    };
    this.goTo = this.goTo.bind(this);
    this.getALStanding = this.getALStanding.bind(this);
    this.getNLStanding = this.getNLStanding.bind(this);
  }

  componentDidMount() {
    this.getALStanding();
    this.getNLStanding();
  }

  getALStanding() {
    axios.get("http://localhost:8080/ALStanding").then(res => {
      this.setState({
        AlStanding: res.data
      });
    });
  }

  getNLStanding() {
    axios.get("http://localhost:8080/NLStanding").then(res => {
      this.setState({
        NLStanding: res.data
      });
    });
  }

  goTo(league) {
    this.setState({
      page: league
    });
  }

  render() {
    let leagueRanking;
    if (this.state.page === "AlStanding") {
      leagueRanking = <AmericanLeague leagueRanking={this.state.AlStanding} />;
    } else if (this.state.page === "NLStanding") {
      leagueRanking = <NationalLeague leagueRanking={this.state.NLStanding} />;
    }
    return (
      <div>
        <div className="container-fluid">
          <Heading />
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>MLB Baseball Standings</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-expand-xs leagueSelection">
                <div>
                  <div className="navbar-nav">
                    <h6
                      className="nav-item nav-link"
                      onClick={() => {
                        this.goTo("AlStanding");
                      }}
                    >
                      AMERICAN LEAGUE
                    </h6>
                    <h6
                      className="nav-item nav-link nav-NlLeague"
                      onClick={() => {
                        this.goTo("NLStanding");
                      }}
                    >
                      NATIONAL LEAGUE
                    </h6>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {leagueRanking}
        </div>
      </div>
    );
  }
}
export default MlbStanding;
