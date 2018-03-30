import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes.js';
import store from './Store.js';
// import {AppContainer} from 'react-hot-loader'
// import { hot } from 'react-hot-loader';
import "./less/common.less";

// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component store={store} />
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }
// // // render(hot(module)(Routes));
// render(ProviderRoutes);

// // // 热加载react-hot-loader
// if (module.hot) {  
//   module.hot.accept('./Routes.js', () => {
//     render(require('./Routes.js').default);
//   })  
// }
ReactDOM.render(
  <Provider store={store()}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <Routes />
//   </Provider>,
//   document.getElementById('app')
// );
