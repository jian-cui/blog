import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from '../App.js';
import routes from './routes.js';
// import omit from 'omit.js';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <App />
      </Router>
    );
  }
}

let comp = (process.env.HOT === true) ? hot(module)(Routes) : Routes;

export default comp;
