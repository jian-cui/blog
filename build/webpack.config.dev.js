const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

let webpackConfig = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', path.resolve(__dirname, '../react/index.js')],
  // entry: ['webpack-hot-middleware/client', path.resolve(__dirname, '../react/index.js')],
  output: {
    // filename: 'script/bundle.js',
    filename: 'script/[name].js',
    chunkFilename: 'script/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/"      // html中script标签的路径头
  },
  module: {
    rules: [{
      test: /\.jsx$|\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins: [
          "react-hot-loader/babel", 
          ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
          }],
          "syntax-dynamic-import"
        ],
        cacheDirectory: true,
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader", "less-loader"]
      // use: ExtractTextPlugin.extract({
      //   fallback: 'style-loader',
      //   use: ['css-loader', 'less-loader']
      // })

    }, {
      // image
      test: /\.(png|svg|jpg|gif|ico)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
  },
  devtool: "source-map",
  // watch: true,
  // externals: ["./node_modules"],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    // 清理特定目录
    // new CleanWebpackPlugin(['client']),

    // 清楚多余js函数
    // 加上后不会生成js.sourcemap
    // new UglifyJSPlugin(),
    
    /** HMR设置 begin */
    // OccurenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
    /** HMR设置 end */

    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // names: ['vendor', 'manifest'],
    //   name: "common",
    //   // filename: 'script/common.js'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './react/template.html',
    //   inject: true,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'development'",
        'HOT': "true",
        'SSR': "true"
      }
    })
  ]
}

module.exports = webpackConfig;