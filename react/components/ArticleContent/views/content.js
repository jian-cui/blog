import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchContent} from '../actions.js';
import * as Status from '../status.js';
import "../style/style.less";

class ArticleContent extends React.Component {
  static defaultProps = {
    status: Status.LOADING
  }
  static propTypes = {
    html: PropTypes.string,
    fetchData: PropTypes.func.isRequired,
    status: PropTypes.oneOf([Status.LOADING, Status.SUCCESS, Status.FAIL])
  }
  constructor (props, context) {
    super(props, context);

    this.getInnerHTML = this.getInnerHTML.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getEmptyArticle = this.getEmptyArticle.bind(this);
  }
  /**
   * 获取React格式的html对象
   */
  getInnerHTML() {
    const { html } = this.props;
    return {
      __html: html
    }
  }
  /**
   * 文章内容jsx
   */
  getArticle() {
    return (
      <div className="article-inner markdown " dangerouslySetInnerHTML={ this.getInnerHTML() }></div>
    )
  }
  /**
   * 空文章内容jsx
   */
  getEmptyArticle() {
    return (
      <div className="article-inner markdown ">
        <div className="article-empty">
          此页面不存在
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.props.fetchData(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id
    if (id != this.props.match.params.id) {
      this.props.fetchData(id);
    }
  }
  render () {
    let articleContent = this.props.html.length > 0 ? this.getArticle() : this.getEmptyArticle();
    return (
      <div className="article-content node-shadow">
          { articleContent }
      </div>
    )
  }
}

export const stateKey = 'articleContent';

const mapStateToProps = (state, ownProps) => {
  return {
    html: state[stateKey].html
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: (id) => dispatch(fetchContent(id))
  }
}

// export default ArticleContent;
export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent);