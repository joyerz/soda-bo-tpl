// @flow
import * as React from 'react'
import { message } from 'antd'
import { history } from 'react-redux-creator'
import md5 from 'blueimp-md5'
import * as localStore from 'utils/localStore'
import { goto, pathInfo } from 'utils/url'
import doFetch from 'utils/fetch'
import { isReady } from 'utils/common'
import { obj2FormData, goc } from 'utils/objectHelper'
import {
  API,
  TOKEN_KEY,
  REFRESH_TOKEN_DURATION,
  EXPIRE_TOKEN_DURATION
} from 'conf'
import { messageActionFailure, messageActionSuccess } from 'utils/messageHelper'
import isMobile from 'utils/browserDetect'
import type { VoidFuncT } from 'src/types/actions'

type HistoryWatcherItemT = {
  name: string,
  cb: () => void
}

class userManager {
  token = null // 用户token
  routersWithoutLogin = ['/login', '/login-staff', '/forgot', '/forgot-staff', '/set-password'] // 无需登录的路由地址
  historyWatcher: Array<HistoryWatcherItemT> = [] //
  userInfo = {
    // 用户信息
    loading: false,
    data: null,
    message: null,
    passwordSetupRequired: false, // 是否需要重设密码
    permission: [],
    userInfo: null,
  }
  tokenRefreshing = false // 是否在刷新token中
  didFetchUserInfoCallbacks = [] // 用户权限获取好之后
  onAfterLogoutCallbacks = [] // 用户退出之后的操作
  noRepeatToken = null // 生成POST存放的唯一TOKEN

  loginNeed = 0

  constructor() {
    this.initHistoryWatcher().then(() => {
      if (this.isLogin()) {
        this.fetchUserInfo()
        this.isSetPassword()
      } else {
        if (!this.isInLoginPage()) {
          this.logOut()
        }
      }
    })
  }

  /**
   * 初始化路由的监听
   */
  async initHistoryWatcher() {
    await isReady(() => !!history)
    history.listen(() => {
      this.historyWatcher.forEach((item: HistoryWatcherItemT) => {
        item.cb()
      })
    })
  }

  /**
   * 添加路由变化的操作
   */
  addHistoryWatcher(funcObject: HistoryWatcherItemT): void {
    this.historyWatcher.push(funcObject)
  }

  /**
   * 移除路由变化的操作
   */
  removeHistoryWatcher(name: string): void {
    this.historyWatcher = this.historyWatcher.filter(
      (item: HistoryWatcherItemT) => item.name !== name
    )
  }

  /**
   * 确保访问的地址是需要登录的
   */
  checkLoginRouter() {
    if (!this.isLogin() && !this.isInLoginPage()) {
      messageActionFailure('loginRequired')
      // goto('/login') // 暂时屏蔽
    }
  }

  /**
   * 验证码登录
   * @param data
   */
  loginByCode(data: {}, onError?: VoidFuncT, onSuccess?: VoidFuncT) {
    let msg = message.info('登录中...请稍后！', 0)
    doFetch({
      url: API.login.byPassword,
      method: 'POST',
      data,
      headers: {
        Authorization: 'Basic Y29uc29sZTpzZWNyZXQ='
      }
    })
      .then(res => {
        msg()
        // if (res.code !== 200) {
        //   message.error(res.msg)
        //   throw new Error(res.msg)
        // } else {
          onSuccess && onSuccess()
          this.saveToken(res.data)
          // this.fetchUserInfo(res.data)
          this.isSetPassword()
        // }
      })
      .catch(err => {
        msg()
        onError && onError()
      })
  }

  /**
   * 密码登录
   * @param data
   */
  loginByPassword(data: {}, onError?: VoidFuncT, onSuccess?: VoidFuncT) {
    let msg = message.info('登录中...请稍后！', 0)
    doFetch({
      url: API.login.byPassword,
      method: 'POST',
      data,
      headers: {
        Authorization: 'Basic Y29uc29sZTpzZWNyZXQ='
      }
    })
      .then(res => {
        msg()

        // if (res.code !== 200) {
        //   message.error(res.msg)
        //   throw new Error(res.msg)
        // } else {
          onSuccess && onSuccess()
          this.saveToken(res)
          // this.fetchUserInfo()
          this.onAfterLogin()
        // }
      })
      .catch(err => {
        msg()
        onError && onError()
      })
  }

  /**
   * 修改密码
   * @param data
   */
  changePassword(data: {}, onSuccess?: VoidFuncT, onError?: VoidFuncT) {
    doFetch({
      url: API.system.changePassword,
      method: 'PUT',
      data,
      headers: {
        Authorization: this.getRequestHeader()
      }
    })
      .then(res => {
        onSuccess && onSuccess()
      })
      .catch(err => {})
  }

  /**
   * 是否需要设置密码
   */
  isSetPassword() {
    if (this.isInLoginPage()) {
      this.onAfterLogin()
    }

    // doFetch({
    //   url: API.login.isSetPassword,
    //   method: 'GET'
    // }).then(res => {
    //   // this.refresh() // 获取用户数据
    //   const first = pathInfo().first
    //   if (res && res.value) {
    //     this.userInfo.passwordSetupRequired = true
    //     if (first !== 'set-password') {
    //       goto('/set-password')
    //     }
    //   } else {
    //     if (this.isInLoginPage()) {
    //       this.onAfterLogin()
    //     }
    //   }
    // })
  }

  onAfterLogin() {
    isMobile()
      ? goto('/vehicle') // 如果是手机用户，跳转到车辆
      : goto('/') // 如果不是手机，跳转到根上
  }

  /**
   * 设置密码
   */
  async setPassword(new_password: string) {
    try {
      await doFetch({
        url: API.login.setPassword,
        method: 'PUT',
        data: {
          new_password: md5(new_password)
        }
      })
      messageActionSuccess('setPasswordSuccess')
      this.userInfo.passwordSetupRequired = false
      this.onAfterLogin()
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * 设置新密码(忘记密码)
   */
  async setNewPassword(loginName: string, mobile: string, code: string, password: string, isTenant: boolean = true) {
    try {
      if (!isTenant) {
        return this.setNewPasswordStaff(loginName, mobile, code, password)
      }

      const data = {
        companyId: 1016,
        loginName,
        mobile,
        code,
        password
      }
      await doFetch({
        url: API.login.setNewPassword,
        method: 'PUT',
        data,
      })
      messageActionSuccess('setNewPasswordSuccess')
      return true
    } catch (err) {
      console.log(err.message)
      return err.message
    }
  }

  /**
   * 设置新密码(忘记密码) - staff
   */
  async setNewPasswordStaff(username: string, mobile: string, code: string, password: string) {
    try {
      const data = {
        username,
        mobile,
        code,
        password
      }
      await doFetch({
        url: API.login.setNewPasswordStaff,
        method: 'PUT',
        data,
      })
      messageActionSuccess('setNewPasswordSuccess')
      return true
    } catch (err) {
      console.log(err.message)
      return err.message
    }
  }

  /**
   * 刷新token
   */
  async refreshToken() {
    const token = this.getToken()
    if (!token) return false

    if (this.tokenRefreshing) {
      await isReady(() => !this.tokenRefreshing)
      return this.getToken()
    } else {
      this.tokenRefreshing = true

      try {
        const newToken = await doFetch({
          url: API.login.refreshToken,
          method: 'POST',
          data: obj2FormData({
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token
          }),
          headers: {
            Authorization: 'Basic Y29uc29sZTpzZWNyZXQ='
          }
        })

        //如果没有获取到新token
        if (!newToken) {
          throw new Error('刷新token失败')
        }

        this.saveToken(newToken)
        this.tokenRefreshing = false
        return newToken
      } catch (err) {
        this.tokenRefreshing = false
        setTimeout(this.logOut, 0)
        return false
      }
    }
  }

  /**
   * 获取token
   * @return {*}
   */
  getToken() {
    return localStore.get(TOKEN_KEY) || null
  }

  /**
   * 存token
   * @param userData
   */
  saveToken(userData: any): void {
    let token = null
    if (userData) {
      userData = { ...userData }
      const currentToken = this.getToken()
      const now = new Date().getTime()
      // 如果需要存的token 跟当前token一致，那么只需要更新一下token的时间
      if (
        currentToken &&
        currentToken.access_token === userData.access_token &&
        currentToken.refresh_token === userData.refresh_token &&
        currentToken.time
      ) {
        userData.time = currentToken.time
      } else {
        userData.time = now
      }
      userData.updateTime = now
      token = userData
    }
    localStore.save(TOKEN_KEY, token)
  }

  /**
   * 更新Token的时间
   */
  updateTokenTime() {
    let token = this.getToken()
    token = Object.assign({}, token, { updateTime: new Date().getTime() })
    localStore.save(TOKEN_KEY, token)
  }

  isInLoginPage() {
    const url = location.href
    const found = this.routersWithoutLogin.filter(
      item => url.indexOf(item) !== -1
    )
    return found.length > 0
  }

  /**
   * 检查是否登录
   * @return {boolean}
   */
  isLogin() {
    // console.log('is login', !!this.getToken())
    return true // return !!this.getToken()
  }

  /**
   * 从服务器获取用户信息
   */
  async fetchUserInfo() {
    const token = this.getToken()
    if (!token) return null

    this.userInfo = this.getToken()
    this.doUserInfoDidFetch()
    return this.userInfo

    // if (this.userInfo.loading) {
    //   await isReady(() => !this.userInfo.loading)
    // } else {
    //   this.userInfo.loading = true
    //
    //   if (!this.userInfo.message) {
    //     this.userInfo.message = message.loading('正在加载用户信息...', 0)
    //   }
    //   // try {
    //   //   this.userInfo.data = await doFetch({
    //   //     url: API.login.userData,
    //   //     method: 'GET'
    //   //   })
    //   //   const permission = await doFetch({
    //   //     url: API.login.permission,
    //   //     method: 'GET'
    //   //   })
    //   //   this.userInfo.permission = this.flatPermission(permission)
    //   // } catch (err) {
    //   //   console.log(err)
    //   // }
    //   this.userInfo = this.getToken()
    //   this.userInfo.message && this.userInfo.message()
    //   this.userInfo.message = null
    //   this.userInfo.loading = false
    // }
    // this.doUserInfoDidFetch() // 登录并获取用户消息以后执行相关操作
    // return this.userInfo.data
  }

  // async fetchUserInfo() {
  //   const token = this.getToken()
  //   if (!token) return null
  //
  //   if (this.userInfo.loading) {
  //     await isReady(() => !this.userInfo.loading)
  //   } else {
  //     this.userInfo.loading = true
  //
  //     if (!this.userInfo.message) {
  //       this.userInfo.message = message.loading('正在加载用户信息...', 0)
  //     }
  //     try {
  //       this.userInfo.data = await doFetch({
  //         url: API.login.userData,
  //         method: 'GET'
  //       })
  //       const permission = await doFetch({
  //         url: API.login.permission,
  //         method: 'GET'
  //       })
  //       this.userInfo.permission = this.flatPermission(permission)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //     this.userInfo.message && this.userInfo.message()
  //     this.userInfo.message = null
  //     this.userInfo.loading = false
  //   }
  //   this.doUserInfoDidFetch() // 登录并获取用户消息以后执行相关操作
  //   return this.userInfo.data
  // }

  /**
   * 扁平化权限数组
   * @param permission
   * @return {Array}
   */
  flatPermission(permission: Array<any>): Array<string> {
    const result = []
    permission.forEach(item => {
      if (item.base && item.operations && item.operations.length > 0) {
        item.operations.forEach(per =>
          result.push(item.base.action + '/' + per.action)
        )
      }
    })
    return result
  }

  getRequestHeader() {
    const token = this.getToken()
    if (token) {
      return `${token.access_token}`
    }
    return null
  }

  getUserInfo() {
    return this.userInfo.data
  }

  isPermissionReady() {
    return this.userInfo.permission.length > 0
  }

  userInfoDidFetch(cb: () => void): void {
    // if (this.isPermissionReady()) {
    //   this.doUserInfoDidFetch()
    // } else {
    //   this.didFetchUserInfoCallbacks.push(cb)
    // }
    this.didFetchUserInfoCallbacks.push(cb)
  }

  doUserInfoDidFetch() {
    this.didFetchUserInfoCallbacks.forEach(cb => cb())
  }

  /**
   * 是否有权限
   */
  isPermission(str: string): boolean {
    return true
    /*if (this.userInfo?.userInfo?.loginType === 'TENANT') {
      return true
    }

    return !!(
      this.userInfo.permission &&
      str &&
      this.userInfo.permission.indexOf(str) !== -1
    ) || true*/
  }

  /**
   * 是否是TENANT
   * @return {boolean}
   */
  isPermissionTenant() {
    const result = this.userInfo?.userInfo?.loginType === 'TENANT'
    if(!result) {
      messageActionFailure('notTenant')
    }
    return result
  }

  fetchNoRepeatToken() {
    // 新系统不查询了
    // this.noRepeatToken = null
    // doFetch({
    //   url: API.noRepeat.token
    // }).then(token => {
    //   this.noRepeatToken = token
    // })
  }

  getNoRepeatToken() {
    return this.noRepeatToken
  }

  onAfterLogout(obj: { name: string, cb: any }) {
    this.onAfterLogoutCallbacks.push(obj)
  }

  removeAfterLogout(name: string) {
    const index = this.onAfterLogoutCallbacks.findIndex(
      item => item.name === name
    )
    this.onAfterLogoutCallbacks.splice(index, 1)
  }

  didLogout() {
    this.onAfterLogoutCallbacks.map((item: any) => item.cb())
  }

  clear() {
    this.saveToken()
    this.userInfo.message && this.userInfo.message()
    this.userInfo.data = null
    this.userInfo.message = null
    this.userInfo.loading = false
    this.userInfo.permission = []
    this.tokenRefreshing = false
    this.didLogout()
  }

  logOut = () => {
    let token = this.getToken()
    this.clear()
    goto('/login')
  }
  /**
   * 检查是否需要验证码
   * @return {Promise<void>}
   */
  async checkLoginCodeNeeded () {
    if (this.loginNeed === 0) {
      const data = await doFetch({
        url: API.login.loginCodeNeed,
        method: 'GET',
      })
      this.loginNeed = goc(data, 'is_verification') || false
    }
    return this.loginNeed
  }
}

const Instant = (() => {
  let instant = null
  return () => {
    if (!instant) {
      instant = new userManager()
    }
    return instant
  }
})()()

export default Instant
