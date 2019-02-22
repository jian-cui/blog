const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

let webpackConfig = {
  entry: ['./react/index.js', hotMiddlewareScript],
  output: {
    // filename: 'script/bundle.js',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: "/"      // html中script标签的路径头
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      // options: {
      //   presets: ['es2015', 'stage-0', 'react']
      // }
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
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  externals: ["./node_modules"],
  watch: true,
  plugins: [
    // 清理特定目录
    // new CleanWebpackPlugin(['client']),

    // 清楚多余js函数
    // new UglifyJSPlugin(),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './react/template.html',
    //   inject: true,
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}

// 获取指定目录下的入口文件
function getEntries(globPath) {
  let files = glob.sync(globPath),
    entries = {};

  files.forEach(function(filepath) {
    let split = filepath.split('/');
    let name = split[split.length - 2];

    entries[name] = './' + filepath;
  })

  return entries;
}

// let entries = getEntries('react/page/**/index.js')

// Object.keys(entries).forEach(function (name) {
  // webpackConfig.entry[name] = [entries[name], 'whatwg-fetch', hotMiddlewareScript];

  // let plugin = new HtmlWebpackPlugin({
  //   filename: 'html/' + name + '.html',
  //   template: './react/template.html',
  //   inject: true,
  //   chunks: [name, 'common'] // 正式版去掉hot
  // })

  // webpackConfig.plugins.push(plugin);
// })


module.exports = webpackConfig;