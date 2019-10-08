// @flow
import { history } from 'react-redux-creator'
import { PUBLIC_FOLDER } from 'conf'
import type { pathT } from 'src/types/utils.url'

/**
 * 获取浏览器路径
 * @return {{first, second, thrid, fourth}}
 */
export const pathInfo = (): pathT => {
  let path = location.pathname
  if (PUBLIC_FOLDER !== '') {
    path = path.split(PUBLIC_FOLDER)
    path = path[1]
  }

  const match = /\/([\w-]+)\/?([\w-]+)?(?:\/([\w-]+)?)?(?:\/([\w-]+)?)?/gi.exec(
    path,
  )

  let routes = {}
  if (match && match.length > 1) {
    routes = {
      first: match[1] || '',
      second: match[2] || '',
      third: match[3] || '',
      fourth: match[4] || '',
    }
  } else {
    routes = { first: '', second: '', third: '', fourth: '' }
  }

  return routes
}

/**
 * 判断当前是否在登录/重置密码/忘记密码的页面
 * @return {boolean}
 */
export function isLoginPage() {
  const paths = ['login', 'set-password', 'forgot']
  return paths.indexOf(pathInfo().first) !== -1
}

export function getPath(path: string): string {
  return PUBLIC_FOLDER + path
}

/**
 * 跳转
 * @param path
 */
export function goto(path: string): void {
  history.push(getPath(path))
}

/**
 * 地址替换
 * @param path
 */
export function replaceto(path: string): void {
  history.replace(getPath(path))
}

/**
 * 获取浏览器的参数
 * @return {object}
 */
export function getParams(): any {
  const result = {}
  const str = location.search
  const params = new URLSearchParams(str)
  for (let k of params.keys()) {
    result[k] = params.get(k)
  }
  return result
}

/**
 * 获取浏览器的参数，针对page, limit额外提取
 * @return {{page, limit, params}}
 */
export function getReduxParams(): any {
  return getParams()
}
