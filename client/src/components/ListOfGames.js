import React, { Component } from "react";

import "../css/App.css";

class ListOfGames extends Component {
  render() {
    let listOfGames;
    const gamesArray = this.props.listOfGames;
    const mlbStanding = this.props.teamStanding;
    const getGetOrdinal = this.props.getGetOrdinal;
    const getDivisionAcronym = this.props.getDivisionAcronym;
    if (gamesArray.totalItems !== 0 && gamesArray.totalItems !== undefined) {
      listOfGames = gamesArray.dates[0].games.map((x, index) => {
        let homeDivisionRank;
        let awayDivisionRank;
        let awayDivision;
        let homeDivision;
        let awayScore = 0;
        let homeScore = 0;
        if (x.teams.away.hasOwnProperty("score")) {
          awayScore = x.teams.away.score;
          homeScore = x.teams.home.score;
        }
        mlbStanding.forEach(y => {
          if (x.teams.away.team.name === y.name) {
            awayDivisionRank = getGetOrdinal(y.divisionRank);
            awayDivision = getDivisionAcronym(y.division);
          }
          if (x.teams.home.team.name === y.name) {
            homeDivisionRank = getGetOrdinal(y.divisionRank);
            homeDivision = getDivisionAcronym(y.division);
          }
        });
        return (
          <li key={index}>
            <div>
              {/*if there are no games played text color remains white else depending on who isWinner*/}
              <div>
                <img
                  src={require(`../css/icons/${x.teams.away.team.name}.png`)}
                />
                <h5
                  className={`awayTeam ${
                    x.teams.away.hasOwnProperty("isWinner")
                      ? x.teams.away.isWinner ? "winner" : "loser"
                      : "noGames"
                  }`}
                >
                  {x.teams.away.team.name} : {awayScore}
                </h5>
              </div>
              <h6 className="teamRecord">
                {x.teams.away.leagueRecord.wins}-{
                  x.teams.away.leagueRecord.losses
                }, {awayDivisionRank} {awayDivision}
              </h6>
            </div>
            <div>
              <div>
                <img
                  src={require(`../css/icons/${x.teams.home.team.name}.png`)}
                />
                <h5
                  className={`homeTeam ${
                    x.teams.home.hasOwnProperty("isWinner")
                      ? x.teams.home.isWinner ? "winner" : "loser"
                      : "noGames"
                  }`}
                >
                  {x.teams.home.team.name} : {homeScore}
                </h5>
              </div>
              <h6 className="teamRecord">
                {x.teams.home.leagueRecord.wins}-{
                  x.teams.home.leagueRecord.losses
                }, {homeDivisionRank} {homeDivision}
              </h6>
            </div>
          </li>
        );
      });
    }

    return (
      <div className="row listOfGames">
        <div className="col-lg-3 col-md-5">{listOfGames}</div>
      </div>
    );
  }
}

export default ListOfGames;
