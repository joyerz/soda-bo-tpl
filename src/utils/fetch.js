import axios from 'axios'
import { message } from 'antd'
import UserManager from 'src/services/userManager'
import { messageActionFailure } from 'utils/messageHelper'
import { API } from 'conf/api'
import { goto } from 'utils/url'
import { NO_REPEAT_POST_API } from 'conf/singlePostAPI'
import { goc } from './objectHelper'

export default function doFetch(options) {
  // UserManager.checkLoginRouter()
  const {
    url,
    method = 'GET',
    data = null,
    headers = null,
    noRepeatToken = null
  } = options
  const config = {
    url,
    method,
  }
  if (method !== 'GET' && data) {
    /**
     * 删除空值
     */
    Object.keys(data).forEach((key: string) => {
      const value = data[key]
      if (value === null || value === undefined) {
        data[key] = ''
        // delete data[key]
      }
    })

    config.data = data
  }
  if (data instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' }
  } else {
    config.headers = { 'Content-Type': 'application/json' }
  }
  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers
    }
  }

  const accessToken = UserManager.getRequestHeader()
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = config.headers.Authorization || 'Bearer ' + accessToken // 如果原来header有Authorization, 应该使用原来的
  }

  // 如果method 是POST, 并且请求的接口在限制的接口里，加入header token
  if (method === 'POST' && NO_REPEAT_POST_API.indexOf(url) !== '-1') {
    const token = UserManager.getNoRepeatToken()
    config.headers.token = token
  }
  // if (noRepeatToken) {
  //   config.headers.token = noRepeatToken
  // }
  console.log('r', config)

  return axios(config)
    .then(res => {
      // if (res.data.code === 200) {
      if ([200, 201].includes(res.status)) {
        return res.data
      }
      throw res.data
    })
    .catch(err => {
      if (err.response ?.status === 401) {
        err.response.data = { status: 401 }
      } else {
        err = err.response ?.data
      }
      return errorHandler(options, err, url)
    })
}

const errorHandler = (options, err, url) => {
  const status = goc(err, 'response.status')
  const status1 = goc(err, 'status')
  const status2 = goc(err, 'code')

  if (status === 406 || status1 === 406) {
    UserManager.clear()
    // goto('/login')
  } else if (status === 401 || status1 === 401 || status2 == 401) {
    messageActionFailure('loginRequired')
    UserManager.logOut()
    // if (UserManager.getToken()) {
    //   // 如果本地有token历史
    //   if (url === API.login.refreshToken) {
    //     // 如果是刷新token的接口401
    //     UserManager.clear()
    //     // goto('/login')
    //     messageActionFailure('refreshTokenFail')
    //     // throw new Error('登录失效')
    //   } else {
    //     return UserManager.refreshToken().then(result => {
    //       // console.log('token', result)
    //       if (!result) {
    //         messageActionFailure('refreshTokenFail')
    //         // throw new Error('登录失效')
    //       } else {
    //         return doFetch(options)
    //       }
    //     })
    //   }
    // } else {
    //   // 如果本地没有有token历史
    //   messageActionFailure('loginRequired')
    // }
  } else {
    const errorMessage = handleFetchError(err)
    throw new Error(errorMessage)
  }
  // } else if (status > 401 || status1 > 401) {
  //   const errorMessage = handleFetchError(err)
  //   throw new Error(errorMessage)
  // } else if (status === 400 || status1 === 400) {
  //   const errorMessage = handleFetchError({ message: '资源未找到' })
  //   throw new Error(errorMessage)
  // } else {
  //   throw new Error(handleFetchError(err))
  // }
}

/**
 * 处理请求错误
 * @param err
 */
function handleFetchError(err = {}) {
  let msg = err ?.response ?.data ?.invoice ?.message || err ?.message
  if (!msg) {
    const errors = err ?.response ?.data ?.invoice ?.errors
    if (errors && errors instanceof Array) {
      msg = errors[0] ?.message
    }
  }
  // if (!msg && err?.message) {
  if (!msg) {
    if (err.message === 'Network Error') {
      msg = '网络异常!'
    } else {
      msg = err.message || err.msg
    }
  }

  msg = msg || '未知错误!'
  message.error(msg)
  return msg
}
