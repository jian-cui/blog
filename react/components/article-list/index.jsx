import React from 'react';
import ArticleUnit from '../article-unit/index.jsx';
import Sidebar from '../sidebar/index.jsx';
// import ajax from '../../common.js';
import 'whatwg-fetch';
import "./style.less";

class ArticleList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      articles: [],
      userInfo: {}
    }
  }
  componentDidMount() {
    // 获取数据
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
      console.log(data)
      _this.setState({
        articles: data
      })
    }).catch(function (e) {
    })
  }
  render () {
    return (
      <div className="article-list">
        { this.state.articles.map((article, index) => 
          <ArticleUnit 
            key={index}
            id={article.id}
            title={article.title} 
            content={article.content}
            view={article.view} 
            time={article.time} 
            tagID={article.tag_id}
            tagTitle={article.tag_title}
        />) }
      </div>
      // <div id="main-wrapper">
      //   <div className="content-wrapper">
      //     <div className="content-wrapper-inner">
      //     { this.state.articles.map((article, index) => <ArticleUnit 
      //                                                     key={index}
      //                                                     url={article.url}
      //                                                     title={article.title} 
      //                                                     content={article.content}
      //                                                     click={article.click} 
      //                                                     time={article.time} 
      //                                                     tags={article.tags} />) }
      //     </div>
      //   </div>
      //   <div id="sidebar" className="node-shadow">
      //     <Sidebar info={ this.state.userInfo } />
      //   </div>
      //   <div className="clearfix"></div>
      // </div>
      )
  }
}

export default ArticleList;