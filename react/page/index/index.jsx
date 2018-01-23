import React from 'react';
import Navbar from '../../components/navbar/index.jsx';
import ArticleList from '../../components/article-list/index.jsx';
import Sidebar from '../../components/sidebar/index.jsx'

class IndexPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }
  render() {
    return (
      <div id='page'>
        <Navbar />
        <div id="main-wrapper">
        <div className="content-wrapper">
          <div className="content-wrapper-inner">
            <ArticleList />
          </div>
        </div>
        <div id="sidebar" className="node-shadow">
          <Sidebar info={ this.state.userInfo } />
        </div>
        <div className="clearfix"></div>
      </div>
        <div id='footer'>崔健</div>
      </div>
    )
  }
}

export default IndexPage;