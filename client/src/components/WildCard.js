import React, { Component } from "react";
import "../css/App.css";

class WildCard extends Component {
  render() {
    let tableStanding;
    let ALLeague;
    let NLLeague;
    const leagueRanking = this.props.leagueRanking;
    if (leagueRanking.legnth !== 0) {
      ALLeague = leagueRanking.filter(x=>{
       return x.division.includes("American League")
      })
      let ALarray = [];
      for(let i = 0; i < ALLeague.length; i++){
        ALLeague[i].wildCardRank = parseInt(ALLeague[i].wildCardRank);
        ALarray.push(ALLeague[i])
      }
      ALLeague = ALarray.sort((a, b)=>{
        return a.wildCardRank - b.wildCardRank;
      }).filter(x=>{
        console.log(x.wildCardRank)
        return !isNaN(x.wildCardRank)
      })
      .map((x)=>{
        console.log(x);
          return (
            <tbody key={x.leagueRank}>
              <tr>
                <td>{x.name}</td>
                <td>
                  {x.leagueRecord.wins}-{x.leagueRecord.losses}
                </td>
                <td>{x.leagueRecord.pct}</td>
                <td>{x.wildCardGamesBack}</td>
              </tr>
            </tbody>
          )
      })
      NLLeague = leagueRanking.filter(x=>{
       return x.division.includes("National League")
      })
      let array = [];
      for(let i = 0; i < NLLeague.length; i++){
        NLLeague[i].wildCardRank = parseInt(NLLeague[i].wildCardRank);
        array.push(NLLeague[i])
      }
      NLLeague = array.sort((a, b)=>{
        return a.wildCardRank - b.wildCardRank;
      }).filter(x=>{
        console.log(x.wildCardRank)
        return !isNaN(x.wildCardRank)
      })
      .map((x)=>{
        console.log(x);
          return (
            <tbody key={x.leagueRank}>
              <tr>
                <td>{x.name}</td>
                <td>
                  {x.leagueRecord.wins}-{x.leagueRecord.losses}
                </td>
                <td>{x.leagueRecord.pct}</td>
                <td>{x.wildCardGamesBack}</td>
              </tr>
            </tbody>
          )
      })




    }
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
            <th>American League</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {ALLeague}

        </table>
        <table className="table">
          <thead>
            <tr>
            <th>National League</th>
            <th>W-L</th>
            <th>PCT</th>
            <th>GB</th>
            </tr>
          </thead>
          {NLLeague}

        </table>
      </div>
    );
  }
}
export default WildCard;
