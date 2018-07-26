import React, { Component } from "react";
import "../css/App.css";

class AmericanLeague extends Component {
  render() {
    let tableStanding;
    let ALCentral;
    let ALEast;
    let ALWest;
    const leagueRanking = this.props.leagueRanking;

    if (leagueRanking.legnth !== 0) {
      ALEast = leagueRanking
        .filter(x => {
          return x.division === "American League East";
        })
        .map((y, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{y.name}</td>
                <td>
                  {y.leagueRecord.wins}-{y.leagueRecord.losses}
                </td>
                <td>{y.leagueRecord.pct}</td>
                <td>{y.divisionGamesBack}</td>
              </tr>
            </tbody>
          );
        });
      ALWest = leagueRanking
        .filter(x => {
          return x.division === "American League West";
        })
        .map((y, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{y.name}</td>
                <td>
                  {y.leagueRecord.wins}-{y.leagueRecord.losses}
                </td>
                <td>{y.leagueRecord.pct}</td>
                <td>{y.divisionGamesBack}</td>
              </tr>
            </tbody>
          );
        });
      ALCentral = leagueRanking
        .filter(x => {
          return x.division === "American League Central";
        })
        .map((y, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{y.name}</td>
                <td>
                  {y.leagueRecord.wins}-{y.leagueRecord.losses}
                </td>
                <td>{y.leagueRecord.pct}</td>
                <td>{y.divisionGamesBack}</td>
              </tr>
            </tbody>
          );
        });
    }

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
            <th>AL East</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {ALEast}
        </table>
        <table className="table">
          <thead>
            <tr>
            <th>AL West</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {ALWest}
        </table>
        <table className="table">
          <thead>
            <tr>
            <th>AL Central</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {ALCentral}
        </table>
      </div>
    );
  }
}
export default AmericanLeague;
