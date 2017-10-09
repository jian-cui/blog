import React from 'react';
import './style.less';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props.data;
  }
  render() {
    let title = this.props.title;
    let list = this.props.list;
    let item;
    return (
      <article class="article-list">
        <h1 class="article-title">{title}</h1>
        <table class="list-wrapper">
          <tbody>
          for (let i = 0;i < list.length; i++) {
            item = list[i];
            <tr>
              <td><a href={ item.url }>{ item.name }</a></td>
              <td class='right'><time>{ item.time }</time></td>
            </tr>
            }
            </tbody>
        </table>
      </article>
    )
  }
}

export default ArticleList;