// 处理import export
require('babel-register')({
  "presets": ["es2015", "stage-0", "react"],
  "plugins": [
    "syntax-dynamic-import", 
    "dynamic-import-node"
  ]
});
require("babel-polyfill");

// require('isomorphic-fetch');
// var fs = require('fs'); 
// var babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));  
// require('babel-register')(babelConfig);

// 处理css
var hook = require('css-modules-require-hook');
const lessParser = require('postcss-less').parse;
hook({
  extensions: '.less',
  processorOpts: {parser: lessParser},
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:8]'
});

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

const webpackConfig = require('../build/webpack.config.dev.js');
const compiler = webpack(webpackConfig);
const routerApi = require('./routes/api');
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true,
  stats: {
    colors: true,
    chunks: false,
    children: false
  }
});

app.use(webpackDevMiddleware);
app.use(require("webpack-hot-middleware")(compiler));

const renderPage = require('./server.Routes.js').default;

// /**
//  * 获取内存中的asset-manifest.json
//  */
// function getAssetManifest() {
//   // console.log(path.resolve(__dirname, '../public/asset-manifest.json'))
//   const content = webpackDevMiddleware.fileSystem.readFileSync('/public/asset-manifest.json');
//   return JSON.parse(content);
// }



// 静态资源
app.use(express.static(path.join(__dirname, '../public')));
// markdown转换后的html、图片等
app.use(express.static(path.join(__dirname, '../html')));

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/api', routerApi);

let count = 1;
app.get('*', function(req, res, next) {
  console.log(count++, req.url);
  // const assetManifest = getAssetManifest();
  const assetManifest = res.locals.webpackStats.toJson().assetsByChunkName;
  // console.log(res.locals.webpackStats.toJson().assetsByChunkName)
  renderPage(req, res, assetManifest, next);
})

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
  console.log('Start test!\n');
});
