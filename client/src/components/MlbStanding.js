import React, { Component } from "react";
import Heading from "./Heading";
import AmericanLeague from "./AmericanLeague";
import NationalLeague from "./NationalLeague";
import WildCard from "./WildCard";
import axios from "axios";
import "../css/App.css";

class MlbStanding extends Component {
  constructor() {
    super();
    this.state = {
      page: "AlStanding",
      NLStanding: [],
      ALStanding: [],
      mlbStanding:[]
    };
    this.goTo = this.goTo.bind(this);
  }

  componentDidMount() {
    var receviedProps = this.props.location.state.mlbStanding;
    let NLStanding = this.state.NLStanding;
    let ALStanding = this.state.ALStanding;
    NLStanding = receviedProps.filter((team)=>{
      if(team.division.includes("National League")){
        return team
      }
    })
    ALStanding = receviedProps.filter((team)=>{
      if(team.division.includes("American League")){
        return team
      }
    })
    this.setState({
      mlbStanding:receviedProps,
      NLStanding:NLStanding,
      ALStanding:ALStanding
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
      leagueRanking = <AmericanLeague leagueRanking={this.state.ALStanding} />;
    } else if (this.state.page === "NLStanding") {
      leagueRanking = <NationalLeague leagueRanking={this.state.NLStanding} />;
    } else if (this.state.page === "WildCard") {
      leagueRanking = <WildCard leagueRanking={this.state.mlbStanding} />;
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
                    <h6
                      className="nav-item nav-link nav-NlLeague"
                      onClick={() => {
                        this.goTo("WildCard");
                      }}
                    >
                      WILDCARD
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
