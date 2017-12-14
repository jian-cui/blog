import React from 'react';
import Navbar from '../components/navbar/index.jsx';
import MainContainer from '../components/main-container/index.jsx';
// import "./style.less";

class IndexPage extends React.Component {
  render() {
    return (
      <div id='page'>
        <Navbar />
        <MainContainer />
        <div id='footer'>崔健</div>
      </div>
    )
  }
}

export default IndexPage;