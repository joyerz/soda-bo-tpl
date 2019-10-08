// @flow

/***
 * ==============================================================
 * 过滤组件 - filter  继承类
 * ==============================================================
 *
 * 配置参数: ***必需***
 * 参数 @prefix -- 路由的一级地址
 *
 * --------------------------------------------------------------
 *
 * props: ***必需***
 * 方法 @actionList(page, limit, params) -- 请求的action
 *
 * --------------------------------------------------------------
 */

import * as React from 'react'
import { replaceto, goto, getReduxParams, pathInfo } from 'utils/url'
import {
  obj2params,
  paramsDateRange2string,
  paramsString2DateRange,
  simpleClone
} from 'utils/objectHelper'
import type { ActionListT } from 'src/types/actions'

type PropsT = {
  actionList: ActionListT
}

export default class FilterBase<
  Props: PropsT,
  State: ?{} = null
> extends React.Component<Props, State> {
  prefix: string = ''
  dateRange: Array<any> = []

  componentDidMount() {
    this.prefix = this.prefix || pathInfo().first
    const reduxParams = getReduxParams()
    let params: any = simpleClone(reduxParams.params)

    this.dateRange.forEach(item => {
      params = paramsString2DateRange(
        params,
        item.dateKey,
        item.fromKey,
        item.toKey
      )
    })
    params = {
      page: params.page || 1,
      limit: params.limit || 10,
    }
    this.props.actionList(params)
  }

  onSubmit = (data: any) => {
    let params = {
      ...getReduxParams(),
      ...data
    }
    this.props.actionList(params)

    params = simpleClone(params)
    params = { ...params }

    this.dateRange.forEach(item => {
      params = paramsDateRange2string(
        params,
        item.dateKey,
        item.fromKey,
        item.toKey
      )
    })

    replaceto(`/${this.prefix}?${obj2params(params)}`)
  }

  onReset = () => {
    const reduxParams = getReduxParams()
    const limit = reduxParams?.limit || 10
    const page = reduxParams?.page || 1

    this.props.actionList({page: 1, limit})
    replaceto(`/${this.prefix}?page=${page}&limit=${limit}`)
  }
}
