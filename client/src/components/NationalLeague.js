import React, { Component } from "react";
import "../css/App.css";

class NationalLeague extends Component {
  render() {
    let tableStanding;
    let NLCentral;
    let NLEast;
    let NLWest;
    const leagueRanking = this.props.leagueRanking;
    if (leagueRanking.legnth !== 0) {
      NLEast = leagueRanking
        .filter(x => {
          return x.division === "National League East";
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
      NLWest = leagueRanking
        .filter(x => {
          return x.division === "National League West";
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
      NLCentral = leagueRanking
        .filter(x => {
          return x.division === "National League Central";
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
            <th>NL East</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {NLEast}
        </table>
        <table className="table">
          <thead>
            <tr>
            <th>NL West</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {NLWest}
        </table>
        <table className="table">
          <thead>
            <tr>
            <th>NL Central</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {NLCentral}
        </table>
      </div>
    );
  }
}
export default NationalLeague;
