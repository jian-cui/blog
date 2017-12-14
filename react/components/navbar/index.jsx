import React from 'react';
import './style.less';


class Navbar extends React.Component {
  render() {
    return (
      <header id="header">
        <h1>
          <a href="#">
            <img src="/image/logo.png" alt=""/>
          </a>
        </h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="#">CSS3</a>
            </li>
            <li>
              <a href="#">JavaScript</a>
            </li>
            <li>
              <a href="#">React</a>
            </li>
            <li>
              <a href="#">Vue</a>
            </li>
            <li>
              <a href="#">翻译</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Navbar;