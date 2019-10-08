const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackHTMLPlugin = require('html-webpack-plugin')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const Visualizer = require('webpack-visualizer-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReduxSagaPlugin = require('./reduxSagaHelperPlugin')

// const reduxPlugin = new ReduxSagaPlugin()
// reduxPlugin.convert()

const vars = require('./webpack.vars')

module.exports = {
  mode: 'production',
  devtool: false,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 删除console
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|redux|react-router|react-router-dom|react-infinite-scroller|moment)[\\/]/,
          name: 'vendor',
          reuseExistingChunk: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
          name: 'antd',
          reuseExistingChunk: true,
        },
      },
    },
    mangleWasmImports: true,
    mergeDuplicateChunks: true,

    runtimeChunk: {
      name: 'manifest',
    },
    portableRecords: true,
  },

  entry: {
    // vendor: ['@babel/polyfill', 'react', 'react-dom', 'redux', 'react-redux-creator', 'react-router'],
    index: path.resolve(__dirname, '../src/index.jsx'),
  },
  resolve: vars.resolve,
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: 'js/[name].[hash:8].bundle.js',
    chunkFilename: 'js/[name].[chunkhash].js',
    crossOriginLoading: 'anonymous',
  },

  module: {
    rules: vars.rules,
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new FlowBabelWebpackPlugin(),
    new ReduxSagaPlugin(),
    // new Visualizer({
    //   filename: './statistics.html',
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new vars.MiniCss({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles/[name]-[contenthash].css',
      chunkFilename: 'styles/[id]-[contenthash].css',
    }),

    /*压缩优化代码结束*/
    new WebpackHTMLPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: './index.html',
      inject: true,
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.png'),
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
}
