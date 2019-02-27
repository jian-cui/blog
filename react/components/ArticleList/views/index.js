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
    // fetchData: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    lock: PropTypes.bool.isRequired
  }
  static fetch(state, dispatch) {
    const fetchTasks = [];
    fetchTasks.push(
      dispatch(fetchArticles())
    );
    return fetchTasks;
  }
  constructor (props, context) {
    super(props, context);
  
    this.scrollPrevDist = 30; // 滚动加载数据的预设距离
    // this.pullArticles = this.pullArticles.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
  }
  /**
   * 拉取数据交给上层的高阶组件来做
   * 
   * 
   * @memberOf ArticleList
   */
  pullArticles () {
    this.constructor.fetch(this.props.getState(), this.props.dispatch);
  }
  /**
   * 绑定滚动事件
   * 
   * @param {any} e 
   * 
   * @memberOf ArticleList
   */
  handleScroll(e) {
    let scrollY = document.documentElement.scrollTop;
    let windowHeight = document.documentElement.clientHeight;
    let docHeight = document.body.clientHeight;
    if (scrollY + this.scrollPrevDist + windowHeight >= docHeight) {
      this.pullArticles();
    }
  }
  componentWillMount() {
    // this.pullArticles = this.pullArticles.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    // 获取数据
    // this.pullArticles();
    // 绑定滚动事件
    // window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount () {
    // window.removeEventListener('scroll', this.handleScroll);
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
            title_en={article.title_en}
            view={article.view} 
            time={article.time}
          />
          )
        }
      </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.articleList ? state.articleList.list : []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // fetchData: () => dispatch(fetchArticles()),
    dispatch: (action) => dispatch(action)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);