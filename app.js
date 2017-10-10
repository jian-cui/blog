const path = require('path');
const express = require('express');
const routerIndex = require('./routes/index');
const https = require('https');
const conf = require('./conf.js');
const app = express();
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// router
app.use('/', routerIndex);
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
app.error(function (err, req, res, next) {
  if (err.status === 404) {
    console.log(111);
  }
  console.log(err);
  // console.log(err.stack);
  // res.status(500).send('Something broke');
})

// 静态资源路径重设
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

let port = conf.test.port;
if (process.env.NODE_ENV == "production") {
  port = conf.production.port;
}

app.listen(port, function() {
  console.log('Example app listening on port ' + port);
})

module.exports = app;
