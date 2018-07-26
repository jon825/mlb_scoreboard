import React, { Component } from "react";
import Heading from "./Heading";
import ListOfGames from "./ListOfGames";
import MlbStanding from "./MlbStanding";
import "../css/App.css";
import axios from "axios";
import ReactDOM from 'react-dom';

import DatePicker from "react-datepicker";
import moment from "moment";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mlbStanding:[],
      todaysGame: [],
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.getGetOrdinal = this.getGetOrdinal.bind(this);
    this.getDivisionAcronym = this.getDivisionAcronym.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  componentDidMount() {
    let data;
    axios.get("http://localhost:8080/").then(res => {
      data = res.data;
      this.setState({
        todaysGame: data.score,
        mlbStanding:data.teamInfo
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  componentWillUpdate(prevProps, prevState) {
    let data;
    let date = this.state.startDate._d.toString().slice(3, 15);
    if (this.state.startDate._d !== prevState.startDate._d) {
      axios
        .post("http://localhost:8080/", {
          date
        })
        .then(res => {
          data = res.data
          this.setState({
            todaysGame: data
          });
           // console.log(this.state.mlbStanding)
        })
        .catch(err => {
          return err;
        });
    }
  }


  getGetOrdinal(n){
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
  }

  getDivisionAcronym(division){
    let acronym;
    let array = division.split(" ");
    for(let i = 0; i < array.length; i++){
      acronym = `${array[0][0]}${array[1][0]} ${array[2]}`;
    }
    return acronym;
  }



  /*
    ReactDOM.render(<App />)

    -----------

    function createStanding(props) {
      return <Standin props={props}
    }

    render() {
      return <Router>
         <Route component={createStanding(props)} />
      </Router>
    }

    <Router>
      <App />
      <Standin />
    </Router>
  */

  render() {
    // console.log(this.state)

    return (
      <div className="App container-fluid">
        <Heading />
        <div className="row justify-content-center datePickerRow">
          <div className="col-lg-2">
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              className="datePicker"
              excludeDates={["7/16/2018", "7/18/2018"]}
            />
          </div>
        </div>
        <ListOfGames listOfGames={this.state.todaysGame} teamStanding={this.state.mlbStanding} getGetOrdinal={this.getGetOrdinal.bind(this)} getDivisionAcronym={this.getDivisionAcronym.bind(this)}/>
      </div>
    );
  }
}



export default App;
