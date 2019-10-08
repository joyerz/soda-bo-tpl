// @flow
import '@babel/polyfill'
import 'core-js/es/map'
import 'core-js/es/set'
import 'raf/polyfill'

import 'utils/browserDetect'
import './assets/scss/global.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import moment from 'moment'
import 'moment/locale/zh-cn'

import { config, Provider } from 'react-redux-creator'
import doFetch from 'utils/fetch'
import routes from './routes'

moment.locale('zh-cn')

// 初始化react-redux-creator
config({
  fetchMethod: doFetch,
  logger: false
})


const root: any = document.getElementById('app')
ReactDOM.render(
  <Provider routes={routes} />,
  root,
)
