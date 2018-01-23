const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
// const icon = require('./react/image/favicon.ico');

let webpackConfig = {
  // entry: ['whatwg-fetch', './react/page/index/index.js', hotMiddlewareScript],
  entry: {
    'fetch': 'whatwg-fetch',
    'index': './react/page/index/index.js',
    'hot': hotMiddlewareScript
  },
  output: {
    // filename: 'script/bundle.js',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, './public'),
    publicPath: "/"      // html中script标签的路径头
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader", "less-loader"]
    }, {
      // image
      test: /\.(png|svg|jpg|gif|ico)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  devtool: "source-map",
  watch: true,
  plugins: [
    // 清理特定目录
    // new CleanWebpackPlugin(['client']),

    // 清楚多余js函数
    // new UglifyJSPlugin(),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'html/index.html',
      template: './react/template.html',
      inject: true,
      // favicon: icon
      // prefix: '/'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}

function getEntries(globPath) {
  let files = glob.sync(globPath),
    // entries = {};
    entries = [];
  
    files.forEach(function(filepath) {
      let split = filepath.split('/');
      let name = split[split.length - 2];

      entries[name] = './' + filepath;
    })

    return entries;
}

// let entries = getEntries('./react/page/**/index.js')

// Object.keys(entries).forEach(function (name) {
//   webpackConfig.entry[name] = entries[name];

//   let plugin = new HtmlWebpackPlugin({
//     filename: 'html/' + name + '.html',
//     template: './react/template.html',
//     inject: true,
//     // chunks: [name]
//   })

//   webpackConfig.plugins.push(plugin);
// })


module.exports = webpackConfig;