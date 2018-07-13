import React, { Component } from "react";
import "../css/App.css";

class TodaysGame extends Component {
  render() {
    let list;
    let games = this.props.listOfGames;

    console.log(this.props.listOfGames);
    if (games.length != 0) {
      list = games.dates[0].games
        .map(day => {
          return day.teams;
        })
        .map((game, index) => {
          let awayScore = 0;
          let homeScore = 0;
          if (game.away.hasOwnProperty("score")) {
            awayScore = game.away.score;
            homeScore = game.home.score;
          }
          return (
            <li key={index}>
              <div>
                {/*if there are no games played text color remains white else depending on who isWinner*/}
                <div
                  className={`awayTeam ${
                    game.away.hasOwnProperty("isWinner")
                      ? game.away.isWinner ? "winner" : "loser"
                      : "noGames"
                  }`}>
                  <img
                    src={require(`../css/icons/${game.away.team.name}.png`)}
                  />
                  <h5>
                    {game.away.team.name} : {awayScore}
                  </h5>
                </div>
                <h6 className="teamRecord">
                  {game.away.leagueRecord.wins}-{game.away.leagueRecord.losses}
                </h6>
              </div>
              <div>
                <div
                  className={`homeTeam ${
                    game.home.hasOwnProperty("isWinner")
                      ? game.home.isWinner ? "winner" : "loser"
                      : "noGames"
                  }`}>
                  <img
                    src={require(`../css/icons/${game.home.team.name}.png`)}
                  />
                  <h5>
                    {game.home.team.name} : {homeScore}
                  </h5>
                </div>
                <h6 className="teamRecord">
                  {game.home.leagueRecord.wins}-{game.home.leagueRecord.losses}
                </h6>
              </div>
            </li>
          );
        });
    }
    return (
      <div className="row listOfGames">
        <div className="col-lg-5">{list}</div>
      </div>
    );
  }
}

export default TodaysGame;
