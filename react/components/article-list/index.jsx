import React from 'react';
import './style.less';

class ArticleList extends React.Component {
  tagList(tags) {
    return tags.map((tag, index) => 
      <a href={tag.url} className="tag" key={index}>{tag.name}</a>
    );
  }
  innerHTML(content) {
    return { __html: content }
  }
  render() {
    return (
      <div className="region">
        <div className="region-nodes">
          <div className="node node-shadow">
            <h1>
              <a target="_blank" href={this.props.url}>{this.props.title}</a>
            </h1>
            <div className="node-header">
              <div className="tags">
                {this.tagList(this.props.tags)}
              </div>
              <div className="info">
                <time>{this.props.time}</time>
                <span>点击：{this.props.click}</span>
              </div>
            </div>
            <div className="node-body" dangerouslySetInnerHTML={ this.innerHTML(this.props.content) }>
            </div>
            <div className="node-footer">
              <a target="_blank" href={this.props.url}className="btn">阅读全文</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleList;