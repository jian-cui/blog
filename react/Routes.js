import React from 'react';
import App from './App.js';
import { view as ArticleList } from './components/ArticleList/';
import { view as ArticleContent} from './components/ArticleContent/';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
// import store from './Store.js';

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

// class ProviderRoutes extends React.Component {
//   render() {
//     return (
//       <Provider store={store()}>
//         <Routes />
//       </Provider>
//     )
//   }
// }
export default hot(module)(Routes);
// export default Routes;