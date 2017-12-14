import React from 'react';
import ArticleList from '../article-list/index.jsx';
import Sidebar from '../sidebar/index.jsx';
// import ajax from '../../common.js';
import 'whatwg-fetch';
import "./style.less";

class MainContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      articles: [],
      userInfo: {}
    }
  }
  componentDidMount() {
    // 获取数据
    console.log(1111);
    const _this = this;
    const option = {
      api: '/api/articleList',
      method: 'post',
      data: {
        test: 1
      },
      credentials: 'include'
    }
    fetch(option.api, {
      method: 'POST',
    }).then(function(response) {
      return response.json();
    }).then(function (data) {
      // console.log(data);
      _this.setState({
        articles: data.articles
      })
    }).catch(function (e) {
      console.log("Error");
    })
  }
  render () {
    return (
      <div id="main-wrapper">
        <div className="content-wrapper">
          <div className="content-wrapper-inner">
          { this.state.articles.map((article, index) => <ArticleList 
                                                          key={index}
                                                          url={article.url}
                                                          title={article.title} 
                                                          content={article.content}
                                                          click={article.click} 
                                                          time={article.time} 
                                                          tags={article.tags} />) }
          </div>
        </div>
        <div id="sidebar" className="node-shadow">
          <Sidebar info={ this.state.userInfo } />
        </div>
        <div className="clearfix"></div>
      </div>
      )
  }
}

export default MainContainer;