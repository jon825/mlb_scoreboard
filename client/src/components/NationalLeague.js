import React, { Component } from "react";
import "../css/App.css";

class NationalLeague extends Component {
  render() {
    let ranking = this.props.leagueRanking;

    let divisionRanking;
    if (ranking.length !== 0) {
      divisionRanking = ranking.map((team, index) => {
        let teamRanking = team.map((x, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{x.name}</td>
                <td>
                  {x.leagueRecord.wins}-{x.leagueRecord.losses}
                </td>
                <td>{x.leagueRecord.pct}</td>
                <td>{x.GB}</td>
              </tr>
            </tbody>
          );
        });
        return (
          <table className="table" key={index}>
            <thead>
              <tr>
                <th scope="col">Division</th>
                <th scope="col">W-L</th>
                <th scope="col">PCT</th>
                <th scope="col">GB</th>
              </tr>
            </thead>
            {teamRanking}
          </table>
        );
      });
    }
    return <div>{divisionRanking}</div>;
  }
}
export default NationalLeague;
