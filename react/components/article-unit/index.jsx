import React from 'react';
import './style.less';

class ArticleUnit extends React.Component {
  constructor (props) {
    super(props);
    this.formTagData = this.formTagData.bind(this);
  }
  formTagData(id, title) {
    const idList = id.split(','),
        titleList = title.split(',');
    return titleList.map((title, index) => 
      <a href={'/tag/' + idList[index]} className="tag" key={index}>{title}</a>
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
              <a target="_blank" href={'/post/' + this.props.id } >{this.props.title}</a>
            </h1>
            <div className="node-header">
              <div className="tags">
                {this.formTagData(this.props.tagID, this.props.tagTitle)}
              </div>
              <div className="info">
                <time>{this.props.time}</time>
                <span>点击：{ this.props.view }</span>
              </div>
            </div>
            <div className="node-body" dangerouslySetInnerHTML={ this.innerHTML(this.props.content) }>
            </div>
            <div className="node-footer">
              <a target="_blank" href={'/post/' + this.props.id } className="btn">阅读全文</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleUnit;