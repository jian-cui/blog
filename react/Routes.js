import React from 'react';
import App from './App.js';
// import ArticleContent from './components/ArticleContent/';
import { view as ArticleList } from './components/ArticleList/';
import { view as ArticleContent} from './components/ArticleContent/';

// import Home from './pages/Home.js';
// import Content from './pages/Content.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Loadable from 'react-loadable';
// import { ConnectedRouter } from 'react-router-redux'
import createHistory from "history/createBrowserHistory";

// const customHistory = createHistory();

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={ArticleList} />
            <Route path="/post/:id" component={ArticleContent} />
          </Switch>
        </App>
      </Router>
    );
  }
}
export default Routes;