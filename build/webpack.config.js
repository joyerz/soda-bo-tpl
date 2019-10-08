const path = require('path')
const webpack = require('webpack')
const WebpackHTMLPlugin = require('html-webpack-plugin')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
const ReduxSagaPlugin = require('./reduxSagaHelperPlugin')

const vars = require('./webpack.vars')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: path.resolve(__dirname, '../src/index.jsx'),
  resolve: vars.resolve,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    crossOriginLoading: 'anonymous'
  },

  module: {
    rules: vars.rules
  },

  plugins: [
    new FlowBabelWebpackPlugin(),
    new ReduxSagaPlugin(),
    //
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),

    // extractCSS,
    new vars.MiniCss({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].css',
      ignore: 'warning'
    }),

    /*压缩优化代码结束*/
    new WebpackHTMLPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: './index.html',
      inject: true,
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.png')
    })
  ],
  // stats: 'errors-only',
  devServer: vars.devServer
}
