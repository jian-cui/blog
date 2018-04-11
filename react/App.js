import React from 'react';
import { view as TopMenu } from './components/TopMenu/';
import { Layout } from '../react-ui/components/';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <TopMenu />
        </Header>
        <Layout className="content-container">
          <Content>
            { this.props.children }
          </Content>
          <Sider collapsible={false}>
            This is a Sider
          </Sider>
        </Layout>
      </Layout>
    )
  }
}

export default App;