const path = require('path');
const express = require('express');
const routerIndex = require('./server/routes/index');
const api = require('./server/routes/api');
const https = require('https');
const conf = require('./conf.js');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: {
      colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));
// database setting
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host:       'localhost',
//   user:       'root',
//   password:   'root',
//   database:   'blog'
// });
// connection.connect();

// 设置view
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'pug');

app.use('/', routerIndex);
// api
app.use('/api', api);
// const myLogger = function (req, res, next) {
//   console.log(app.locals);
//   next();
// }
// const requestTime = function (req, res, next) {
//   req.requestTime = Date.now();
//   next();
// }
// app.use(myLogger);
// app.use(requestTime);
// app.get('/', function (req, res) {
//   var responseText = 'Hello World!<br>'
//   responseText += '<small>Requested at: ' + req.requestTime + '</small>'
//   res.send(responseText);
// })

// 错误处理
app.use(function (err, req, res, next) {
  if (err.status === 404) {
    console.log('404错误 页面未找到');
  }
  res.send(err);
})

// 静态资源路径重设
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client')));

let port = conf.test.port;
if ("production" == process.env.NODE_ENV) {
  port = conf.production.port;
}

app.listen(port, function() {
  console.log('Example app listening on port ' + port);
});

// module.exports = app;
