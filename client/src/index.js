import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import MlbStanding from './components/MlbStanding';

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path = "/" exact component={App} />
      <Route path = "/standing" exact component={MlbStanding} />
    </Switch>
  </Router>
), document.getElementById('root'));
