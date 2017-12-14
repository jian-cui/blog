const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
  entry: ['whatwg-fetch', './react/index.js', hotMiddlewareScript],
  output: {
    filename: 'script/bundle.js',
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
    }]
  },
  devtool: "source-map",
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'html/index.html',
      template: './react/index.html',
      inject: true
      // prefix: '/'
    })
  ]
}