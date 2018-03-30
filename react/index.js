import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes.js';
import store from './Store.js';
// import {AppContainer} from 'react-hot-loader'
import { hot } from 'react-hot-loader';
import "./less/common.less";

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }
// // render(hot(module)(Routes));
// render(Routes);

// // 热加载react-hot-loader
// if (module.hot) {  
//   module.hot.accept('./Routes.js', () => {
//     render(require('./Routes.js'));
//   })  
// }
class ProviderRoutes extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Routes />
      </Provider>
    )
  }
}

// const HotRoutes = hot(module)(ProviderRoutes);

ReactDOM.render(
  <ProviderRoutes />,
  document.getElementById('app')
);