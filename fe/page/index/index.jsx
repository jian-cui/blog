import React from 'react';
import ArticleList from '../../components/article-list/index';

class PageIndex extends React.Component {
  constructor() {
    super();
    // 获取数据
    
  }
  componentWillMount() {
    // 获取数据
    var xhr = new XMLHttpRequest();
    xhr.open('post', '')
  }
  render() {
    return <ArticleList title="Posts" list="" />
  }

}