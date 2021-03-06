import * as React from 'react'
import { Table } from 'antd'
import memoize from 'memoize-one'
import { tableWidth } from 'utils/tableHelper'

import './index.scss'
import BatchOperaction from '../BatchOperation'

const TABLE_COLUMN_WIDTH = {
  s: 80,
  m: 100,
  l: 120,
  xl: 200
}
export default class TableList extends React.PureComponent<any> {
  static defaultProps = {
    fixed: true,
    showSerialNumber: true, // 是否显示序号
  }

  /**
   * 计算表格宽度
   */
  calTableWidth = memoize(columns => tableWidth(columns))

  /* 序号生成 */
  creatSerial = () => {
    const { showSerialNumber, dataSource, columns } = this.props
    let newDataSource = []
    if (showSerialNumber && dataSource && dataSource instanceof Array) {
      const hasSerialNumber = columns.filter(
        item => item.dataIndex === 'serialNumber',
      )
      if (hasSerialNumber.length === 0) {
        columns.unshift({
          dataIndex: 'serialNumber',
          title: '序号',
          width: 60,
        })
      }

      newDataSource = dataSource.map((element, index) => {
        return {
          ...element,
          serialNumber: index + 1,
        }
      })
    } else {
      newDataSource = dataSource
    }

    return newDataSource
  }

  render() {
    const { columns, fixed, footer, batchOption, rowSelection, rowKey='id'} = this.props
    // 处理下columns里的width
    let handledColumns = []
    columns.forEach(item => {
      if (item.width && isNaN(item.width)) {
        handledColumns.push({...item, width: TABLE_COLUMN_WIDTH[item.width]})
      } else {
        handledColumns.push({...item})
      }
    })

    const tableWidth = this.calTableWidth(handledColumns) + 100

    // antd 的 footer 中扩展 全选/反选批量操作
    const _footer = (batchOption || footer) ? () => {
      return <div>
        { 
          batchOption && <BatchOperaction 
            dataSource={this.props.dataSource} 
            setKeys={rowSelection ? rowSelection.onChange : () => {}}
            checkedKeys={rowSelection ? rowSelection.selectedRowKeys : []}
            option={batchOption} 
          /> 
        }
        { footer && footer() }
      </div>
    } : null

    return fixed ? (
      <Table
        {...this.props}
        columns={handledColumns}
        footer={_footer}
        size="middle"
        rowKey={rowKey}
        scroll={{ x: tableWidth, y: 460 }}
        dataSource={this.creatSerial()}
      />
    ) : (
        <Table {...this.props} rowKey={rowKey} columns={handledColumns} size="middle" footer={_footer} dataSource={this.creatSerial()} />
      )
  }
}
