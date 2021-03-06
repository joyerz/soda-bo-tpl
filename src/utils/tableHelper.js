// @flow

export default {}

/**
 * 计算table的宽度
 * @param columns
 * @return {number}
 */
export const tableWidth = (columns: Array<any>) => {
  let width: number = 0
  columns.forEach(item => {
    width += (item.width || 100)
  })
  return width
}
/**
 * 计算table的columns
 * @param wholeColumns{array}表格配置的默认所有列
 * @param data{array}后端存储的表格列配置
 * @return {array}直接适用于table的columns属性
 */
export const getTableColumns = (wholeColumns: Array<any>, data: Array<any> = []) => {
  let tableColumns = []
  let temp = {}
  wholeColumns.forEach(item => {
    item.columns.forEach(item2 => {
      temp = {...item2}
      if (item.columnGroup === 'action' || temp.fixedDisplay) {
        item.columnGroup === 'action' && tableColumns.push({title: '', dataIndex: ''}) // 推入一个空列，防止table 宽度不足而断裂
        tableColumns.push(temp)
      } else {
        let findIndex = data.findIndex(ele => ele.dataIndex === temp.dataIndex)
        if ( findIndex === -1 || (findIndex > -1 && data[findIndex].display)) {
          tableColumns.push(temp)
        }
      }
    })
  })
  return tableColumns
}

