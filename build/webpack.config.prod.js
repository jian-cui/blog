const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

let webpackConfig = {
  // entry: [path.resolve(__dirname, '../react/index.js')],
  entry: {
    main: path.resolve(__dirname, '../react/index.js'),
    common: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-router-dom']
  },
  output: {
    filename: 'script/[name].js',
    chunkFilename: 'script/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/"      // html中script标签的路径头
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins: [
          ["transform-runtime", {
            "polyfill": false,
            "regenerator": true
          }],
          "syntax-dynamic-import",
          "react-hot-loader/babel"
        ],
        // cacheDirectory: true,
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
    extensions: [".js", ".jsx"]
  },
  devtool: false,
  // watch: true,
  externals: ["./node_modules"],
  plugins: [
    // 清理特定目录
    new CleanWebpackPlugin([path.resolve(__dirname, '../public/script')], {
      root: process.cwd()
    }),

    // 清楚多余js函数
    // 加上后不会生成js.sourcemap
    new UglifyJSPlugin(),
    
    /** HMR设置 begin */
    // OccurenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    // new webpack.NoEmitOnErrorsPlugin(),
    /** HMR设置 end */

    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // names: ['vendor', 'manifest'],
      name: "common",
      // filename: 'script/common.js'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'html/index.html',
    //   template: './react/template.html',
    //   inject: true,
    // }),
    new ExtractTextPlugin({
      filename: 'style/style.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'",
        'HOT': "false",
        'SSR': "true"
      }
    })
  ]
}

module.exports = webpackConfig;