const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const MLBApi = require("node-mlb-api");
const teams = MLBApi.getTeams();
const standingsNL = MLBApi.getStandings("NL", 2018);
const standingsAL = MLBApi.getStandings("AL", 2018);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.get("/", (req, res) => {
  let date = new Date(req.body.date);
  sendData(req, res);
});

app.get("/NLStanding", (req, res) => {
  getNLRankings(req, res);
});

app.get("/ALStanding", (req, res) => {
  getALRankings(req, res);
});

app.post("/", (req, res) => {
  let date = new Date(req.body.date);
  date = date.toLocaleDateString();
  MLBApi.getGames(date)
    .then(game => {
      res.send(game);
    })
    .catch(err => {
      return err;
    });
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});

function getListOfGames() {
  return Promise.all([
    MLBApi.getStandings("NL"),
    MLBApi.getStandings("AL"),
    MLBApi.getGames()
  ]);
}

function sendData(req, res) {
  getListOfGames().then(data => {
    let teamInfo = data.reduce((standing, items) => {
      if (items.hasOwnProperty("records")) {
        items.records.map(x => {
          let division;
          if (x.division.id === 205) {
            division = "National League Central";
          } else if (x.division.id === 203) {
            division = "National League West";
          } else if (x.division.id === 204) {
            division = "National League East";
          } else if (x.division.id === 200) {
            division = "American League West";
          } else if (x.division.id === 202) {
            division = "American League Central";
          } else if (x.division.id === 201) {
            division = "American League East";
          }
          x.teamRecords.map(y => {
            // console.log(y)
            let teamObj = {
              name: y.team.name,
              division: division,
              divisionRank: y.divisionRank,
              divisionGamesBack: y.divisionGamesBack,
              leagueRank: y.leagueRank,
              leagueRecord: y.leagueRecord
            };
            standing.push(teamObj);
          });
        });
      }
      return standing;
    }, []);
    res.send(
        data={
          score:data[2],
          teamInfo:teamInfo
        }
      )
  });
}



function getNLRankings(req, res) {
  let nationalLeague = MLBApi.getStandings("NL");
  nationalLeague.then(standing => {
    standing = standing.records.map(x => {
      return x.teamRecords.map(y => {
        return {
          name: y.team.name,
          leagueRank: y.leagueRank,
          divisionRank: y.divisionRank,
          leagueRecord: y.leagueRecord,
          GB: y.divisionGamesBack
        };
      });
    });
    res.send(standing);
  });
}

function getALRankings(req, res) {
  let nationalLeague = MLBApi.getStandings("AL");
  nationalLeague.then(standing => {
    standing = standing.records.map(x => {
      return x.teamRecords.map(y => {
        return {
          name: y.team.name,
          leagueRank: y.leagueRank,
          divisionRank: y.divisionRank,
          leagueRecord: y.leagueRecord,
          GB: y.divisionGamesBack
        };
      });
    });
    res.send(standing);
  });
}




/*
return an array of the team standing as a value in a function

call getStanding() returns a promise
through .then it returns orbjects of array of each team's ranking
i want to assign a new object for each teams ranking
then push the object and assign it to new array and return that array as the value of the function

get team standing through mlb api and through its daya push the teams stadning in the array
i want my function to return the new array of team standing
*/

// MLBApi.getTeams(133).then((x)=>{
//   console.log(x.teams[0]);
// })
