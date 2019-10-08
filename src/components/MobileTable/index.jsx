// @flow
import React, { useEffect } from 'react'
import { Button, Radio, Icon, Empty, Spin, } from 'antd'
import Cell from 'src/components/Cell/index'
import { goc } from 'src/utils/objectHelper'
import { loadMore } from 'src/utils/common'

import './index.scss'

type Props = {
  loading: boolean,
  list: any,
  columns: Array<any>,
  dataSource: any,
  getList?: Function,
}

/**
 * 移动端 table 组件 （参数和web的table组件一样多了一个 getList 获取数据的参数）
 * @param {*} props 
 */
export default function MobileTable(props: Props):any {

  let removeListener: Function = () => {}   // 清理下拉加载更多事件监听

  useEffect(() => {
    if (props.getList) {
      removeListener = loadMore({
        handler: props.getList,
        immediately: true,
      })
    }
    return removeListener
  }, [])

  const { list, columns, dataSource, loading, } = props

  const noData = !!(list.success && !list.data.entries.length)

  const isEnd = !!(list.success && dataSource.length && dataSource.length >= list.data.total_count)

  const [operation] = (columns || []).filter(item => ['操作'].includes(item.title))

  return <div className='mobile-table-wrap' style={{paddingBottom: isEnd ? '' : '50px'}}>
    <Spin spinning={loading}>
      {
        dataSource.map((item: Object, idx: number) => <div key={idx + Math.random()} className="mobile-list-item">
          {
            (columns || []).filter(item => item.title && !['操作'].includes(item.title)).map(
              (data: Object, idx: number) => <Cell key={idx + Math.random()} title={data.title}>
                {
                  data.render
                    ? data.render(goc(item, data.dataIndex), item)
                    : goc(item, data.dataIndex)
                }
              </Cell>
            )
          }

          {
            operation && <div className="mobile-list-hand">
              {operation.render({}, item)}
            </div>
          }
        </div>)
      }

      {
        list.loading && <div className='nodata'>加载中</div>
      }

      {
        isEnd && <div className='nodata'>到底了</div>
      }

      {
        noData && <Empty />
      }
    </Spin>
  </div>
}
