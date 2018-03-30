// // 处理import export
// var fs = require('fs'); 
// var babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));  
// require('babel-register')(babelConfig);

// // 处理css
// var hook = require('css-modules-require-hook');
// const lessParser = require('postcss-less').parse;
// hook({
//   extensions: '.less',
//   processorOpts: {parser: lessParser},
//   camelCase: true,
//   generateScopedName: '[name]__[local]__[hash:base64:8]'
// });


const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const multer = require('multer');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();
const config = require('../build/webpack.config.dev.js');
const compiler = webpack(config);
const routerApi = require('./routes/api');

const reactApp = require('../react/index-ssr.js').default;

/**
 * 服务器端渲染代码
 * @param {React.ComponentType} component 
 */
function handleRender(component, callback) {
  const html = ReactDOMServer.renderToString(React.createElement(component, null, null));
  const template = `${process.cwd()}/react/template.html`;
  // 加载 index.html 的内容
  fs.readFile(template, 'utf8', function (err, data) {
    if (err) throw err;
    // 把渲染后的 React HTML 插入到 div 中
    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
    callback(document);
  });
}

/**
 * 获取内存中的asset-manifest.json
 */
function getAssetManifest() {
  const content = webpackDevMiddleware.fileSystem.readFileSync(__dirname + '../public/asset-manifest.json');
  return JSON.parse(content);
}

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
app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer());

app.use('/api', routerApi);

app.use('*', function(req, res) {
  const asssetManifest = getAssetManifest();

  handleRender(reactApp, function(doc) {
    // console.log(doc);
    res.send(doc);
  })
})

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
  console.log('Start test!\n');
});
