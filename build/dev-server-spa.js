// 处理import export
// const fs = require('fs'); 
// const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));  
// require('babel-register')(babelConfig);

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const bodyParser = require('body-parser');
// const multer = require('multer');

const app = express();
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const reactApp = require('../react/').default;

const api = require('../server/routes/api');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    children: false
  }
}));

const appHTML = ReactDOMServer.renderToString(React.createElement(component, null, null));
// const appHTML = ReactDOMServer.renderToStaticMarkup(React.createElement())
console.log(appHTML);

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
// app.use(multer());

// api
app.use('/api', api);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
  console.log('Start test!\n');
});
