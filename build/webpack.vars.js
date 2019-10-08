const path = require('path')
const MiniCss = require('mini-css-extract-plugin')

const resolve = {
  extensions: ['.js', '.jsx', '.scss', '.less', '.json'],
  alias: {
    src: path.resolve(__dirname, '../src'),
    com: path.resolve(__dirname, '../src/components'),
    utils: path.resolve(__dirname, '../src/utils'),
    assets: path.resolve(__dirname, '../src/assets'),
    conf: path.resolve(__dirname, '../src/conf'),
    pages: path.resolve(__dirname, '../src/pages')
  }
}

const rules = [
  {
    loader: 'webpack-ant-icon-loader',
    enforce: 'pre',
    include: [require.resolve('@ant-design/icons/lib/dist')]
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    // use: ['babel-loader']
    use: ['babel-loader', 'eslint-loader']
  },
  { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

  {
    oneOf: [
      {
        test: /\.less$/,
        include: /node_modules[\\/]antd/,
        use: [
          {
            loader: MiniCss.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              paths: [path.resolve(__dirname, 'node_modules/antd')],
              modifyVars: {
                // 'primary-color': '#1DA57A',
                // 'link-color': '#1DA57A',
                // 'border-radius-base': '2px',
                // or
                hack: 'true; @import \'./src/assets/antd/variable.less\''
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCss.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:10]'
            }
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(
                __dirname,
                '../src/assets/scss/variable.scss'
              )
            }
          }
        ]
      }
    ]
  },
  {
    test: /\.(png|jpg|gif)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=3000&name=images/[name]_[hash].[ext]'
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10240&name=fonts/[name].[ext]'
  }
]

// const apiurl = 'https://dev01.sodacar.com'
const apiurl = 'https://dev-toyota.sodacar.com'

const devServer = {
  contentBase: path.resolve(__dirname, '../dist'),
  port: 3011,
  host: '0.0.0.0',
  proxy: {
    '/api/**': {
      target: 'https://dev-toyota.sodacar.com/',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    },
    '/mockAPI/**': {
      target: 'http://localhost:3100',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/mockAPI': '' }
    },
    '/mbwuuli/**': {
      target: apiurl + '/mbwuuli',
      secure: false,
      pathRewrite: { '^/mbwuuli': '' },
      changeOrigin: true
    },
    '/mbkaar/**': {
      target: apiurl + '/mbkaar',
      secure: false,
      pathRewrite: { '^/mbkaar': '' },
      changeOrigin: true
    },
    '/mbriihi/**': {
      target: apiurl + '/mbriihi',
      secure: false,
      pathRewrite: { '^/mbriihi': '' },
      changeOrigin: true
    },
    '/mbtasco/**': {
      target: apiurl + '/mbtasco',
      secure: false,
      pathRewrite: { '^/mbtasco': '' },
      changeOrigin: true
    },
    '/mbwuuli-admin/**': {
      target: apiurl + '/mbwuuli-admin',
      secure: false,
      pathRewrite: { '^/mbwuuli-admin': '' },
      changeOrigin: true
    },
    '/mbtreasury/**': {
      target: apiurl + '/mbtreasury',
      secure: false,
      pathRewrite: { '^/mbtreasury': '' },
      changeOrigin: true
    }
  }
}

module.exports = {
  MiniCss,
  resolve,
  rules,
  devServer
}
