import React from 'react';
import './style.less';
import 'whatwg-fetch';
import api from '../../api.js';


class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      navList: []
    }
    this.getNavData = this.getNavData.bind(this);
  }
  getNavData () {
    var _this = this;
    fetch(api.tagList, {
      method: 'POST'
    }).then(function (response) {
      return response.json();
    }) .then(function (data) {
      _this.setState({
        navList: data
      })
    })
  }
  componentDidMount () {
    this.getNavData();
  }
  render() {
    const list = this.state.navList.map(item => {
      return (
        <li key={ item.id }>
          <a href={  "/tag/" + item.id }>{ item.tagName }</a>
        </li>
      )
    })
    return (
      <header id="header">
        <h1>
          <a href="#">
            <img src="/image/logo.png" alt=""/>
          </a>
        </h1>
        <nav className="nav">
          <ul>
            { list }
          </ul>
        </nav>
      </header>
    )
  }
}

export default Navbar;