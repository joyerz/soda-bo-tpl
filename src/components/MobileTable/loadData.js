import * as React from 'react'
import { Button, Radio, Icon, Empty, Spin, } from 'antd'
import memoize from 'memoize-one'
import Cell from 'src/components/Cell/index'
import MobileTable from 'src/components/MobileTable'
import { goc } from 'src/utils/objectHelper'

type Props = {
  loading: boolean,
  list: any,
  actionList: Function,
  toggle: Function,
  searchPanel: boolean,
  setSearchState?: Function,
}

export default class LoadMoreComponent<props: Props, state: any> extends React.PureComponent<Props, any> {

  static getDerivedStateFromProps(nextProps: Props, prevState: any) {
    // 缓存所有页码的数据
    let { data } = nextProps.list
    if (data.page == 1) {
      return {
        listCache: {
          [data.page]: data.entries,
        }
      }
    }
    return {
      listCache: {
        ...prevState.listCache,
        [data.page]: data.entries,
      }
    }
  }

  page: number = 1         // 当前页码
  
  searhParams: mixed = {}    // 筛选参数

  state = {
    listCache: {},      // 缓存分页数据
  }

  /**
   * 加载列表
   */
  getList = () => {
    const {
      data,
      loading,
    } = this.props.list
    if (this.page > Math.max(1, data.total_page) || loading) return
    this.props.actionList(this.page, null, this.searhParams)
    this.page += 1
  }

  /**
   * 合并所有分页的数据
   */
  mergeListData = memoize((listCache: any): Array<any> => {
    let data: Array<any> = []

    for (let k in listCache) {
      data = data.concat(listCache[k])
    }
    return data
  })

  /**
   * 筛选事件扩展（新增了点击筛选或者重置后隐藏组件，记录请求参数用于下拉加载更多）
   */
  filterAction = (...args: Array<any>): void => {
    const { actionList, } = this.props
    this.searhParams = args[2]
    this.page = 1
    this.setState({
      listCache: {},
    }, this.getList)
  }
}