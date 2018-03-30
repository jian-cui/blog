import React from 'react';
import {connect} from 'react-redux';
import ArticleCell from './cell.js';
import PropTypes from 'prop-types';
import {fetchArticles} from '../actions.js';
import * as Status from '../status.js';
import "../style/style.less";

class ArticleList extends React.Component {
  static defaultProps = {
    list: [],
    status: Status.LOADING,
    page: 1,
    lock: false
  }
  static propTypes = {
    list: PropTypes.array.isRequired,
    status: PropTypes.oneOf([Status.LOADING, Status.SUCCESS, Status.FAIL]),
    fetchData: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    lock: PropTypes.bool.isRequired
  }
  constructor (props, context) {
    super(props, context);
    // this.state = {
    //   list: [],
    //   // userInfo: {},
    // }
    // this.option = {
    //   api: '/api/articleList',
    //   method: 'post',
    //   data: {
    //     test: 1
    //   },
    //   credentials: 'include'
    // }
    this.scrollPrevDist = 30; // 滚动加载数据的预设距离
    this.pullArticles = this.pullArticles.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    // this.pullLock = false; // 获取新数据锁
  }
  pullArticles () {
    this.props.fetchData();
  }
  handleScroll(e) {
    // console.log(e)
    let scrollY = document.documentElement.scrollTop;
    let windowHeight = document.documentElement.clientHeight;
    let docHeight = document.body.clientHeight;
    if (scrollY + this.scrollPrevDist + windowHeight >= docHeight) {
      this.pullArticles();
    }
  }
  componentDidMount() {
    // 获取数据
    this.pullArticles();
    // 绑定滚动事件
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render () {
    const {list} = this.props;
    return (
      <div className="article-list">
        { list.map((article, index) => 
          <ArticleCell 
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
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.articleList.list,
    lock: state.articleList.lock,
    status: state.articleList.status,
    page: state.articleList.page
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => dispatch(fetchArticles())
  }
}

// export default ArticleList;
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);