import React from 'react';
// import { Button } from '../../../../react-ui/components/';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class ArticleCell extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    title_en: PropTypes.string.isRequired,
    // content: PropTypes.node.isRequired,
    view: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    // tagID: PropTypes.string.isRequired,
    // tagTitle: PropTypes.string.isRequired
  }

  constructor (props, context) {
    super(props, context);
    this.formTagData = this.formTagData.bind(this);
    this.formatTime = this.formatTime.bind(this);
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
  getBlogURL(name) {
    // 根据id返回文章链接
    return '/post/' + name;
  }
  formatTime(time) {
    let [date] = time.split(' ');
    // let date = new Date(time)
    let [year, month, day] = date.split('-');
    let dt = new Date(parseInt(year), parseInt(month), parseInt(day));
    console.log(dt)
    return date;
  }
  render() {
    let {title_en} = this.props;
    let formatTime = this.formatTime;
    return (
      <div className="region">
        <div className="region-nodes">
          <div className="node node-shadow">
            <h1>
              {/* <a href={'/post/' + this.props.title_en } >{this.props.title}</a> */}
              <Link to={this.getBlogURL(title_en)}>{this.props.title}</Link>
            </h1>
            <div className="node-header">
              {/* <div className="tags">
                {this.formTagData(this.props.tagID, this.props.tagTitle)}
              </div> */}
              <div className="info">
                <time>{formatTime(this.props.time)}</time>
                <span>views: { this.props.view }</span>
              </div>
            </div>
            {/* <div className="node-body" dangerouslySetInnerHTML={ this.innerHTML(this.props.content) }>
            </div> */}
            {/* <div className="node-footer">
              <Link to={this.getBlogURL(this.props.id)} className="react-btn react-btn-primary">阅读全文</Link>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleCell;