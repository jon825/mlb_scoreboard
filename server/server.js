const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const MLBApi = require('node-mlb-api');
const teams = MLBApi.getTeams(147);

// console.log(teams.then((score)=>{
//   console.log(score.teams[0])
// }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.get('/',(req, res)=>{
  MLBApi.getGames().then((game)=>{
    res.send(game)
  })
})

app.post('/',(req,res)=>{
  let date = new Date(req.body.date);
  date = date.toLocaleDateString();
  MLBApi.getGames(date).then((game)=>{
    console.log(game.dates[0].games.map((awayScore)=>{
      return awayScore.teams
    }))
    res.send(game);
  })
})


app.listen(PORT ,()=>{
  console.log(`SERVER RUNNING ON ${PORT}`)
})


