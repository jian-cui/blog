// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
// // const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const glob = require('glob');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// let webpackConfig = {
//   entry: [path.resolve(__dirname, '../react/index.js'), 'webpack-hot-middleware/client'],
//   output: {
//     // filename: 'script/bundle.js',
//     filename: '[name].js',
//     chunkFilename: '[name].chunk.js',
//     path: path.resolve(__dirname, './public'),
//     // publicPath: "http://localhost:3000"      // html中script标签的路径头
//   },
//   module: {
//     loaders: [{
//       test: /\.jsx$|\.js$/,
//       exclude: /node_modules/,
//       loader: 'babel-loader',
//       options: {
//         presets: ['es2015', 'stage-0', 'react']
//       }
//     }, {
//       test: /\.less$/,
//       exclude: /node_modules/,
//       // use: ["style-loader", "css-loader", "less-loader"]
//       use: ExtractTextPlugin.extract({
//         fallback: 'style-loader',
//         use: ['css-loader', 'less-loader']
//       })

//     }, {
//       // image
//       test: /\.(png|svg|jpg|gif|ico)$/,
//       use: [
//         'file-loader'
//       ]
//     }]
//   },
//   resolve: {
//     extensions: [".js", ".jsx"]
//   },
//   devtool: "source-map",
//   // watch: true,
//   // externals: ["./node_modules"],
//   plugins: [
//     // 清理特定目录
//     // new CleanWebpackPlugin(['client']),

//     // 清楚多余js函数
//     // 加上后不会生成js.sourcemap
//     // new UglifyJSPlugin(),
    
//     /** HMR设置 begin */
//     // OccurenceOrderPlugin is needed for webpack 1.x only
//     // new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     // Use NoErrorsPlugin for webpack 1.x
//     new webpack.NoEmitOnErrorsPlugin(),
//     /** HMR设置 end */

//     // new HtmlWebpackPlugin({
//     //   filename: 'index.html',
//     //   template: './react/template.html',
//     //   inject: true,
//     // }),
//     // new webpack.optimize.CommonsChunkPlugin({
//     //   name: '/script/common'
//     // }),
//     new ExtractTextPlugin({
//       filename: 'style/style.css'
//     })
//   ]
// }

// module.exports = webpackConfig;