import React from 'react';
import { view as TopMenu } from './components/TopMenu/';
import { Layout } from '../react-ui/components/';
import { Route, Switch } from "react-router-dom";
import routes from './router/routes.js';
import { hot } from 'react-hot-loader/root';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Layout className="content-container">
        <Content>
          <Switch>
            {
              routes.map(route => {
                return <Route {...route} key={route.path} />
              })
            }
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

// let comp = (process.env.HOT === true) ? hot(App) : App;

export default hot(App);