import React, { Component } from "react";
import TodaysGame from './TodaysGame';
import "../css/App.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todaysGame: [],
      startDate: moment(),
      test: ""
    };
    this.handleChange = this.handleChange.bind(this);
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
        todaysGame: data,
        test: "will mount"
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let data;
    let date = this.state.startDate._d.toString().slice(3, 15);
    if(this.state.startDate._d !== prevState.startDate._d){
      axios.post("http://localhost:8080/", {
        date
      })
      .then((res=>{
        this.setState({
          todaysGame:res.data
        })
      }))
      .catch(err=>{
        return err;
      })
    }
  }

  render() {




    return (
      <div className="App container-fluid">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          className="datePicker"
        />
        <TodaysGame
          listOfGames = {this.state.todaysGame}
        />

      </div>
    );
  }
}

export default App;
