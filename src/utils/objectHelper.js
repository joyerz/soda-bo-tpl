// @flow
export default {}

export const simpleClone = (obj: {} | []):any => obj ? JSON.parse(JSON.stringify(obj)) : {}
/**
 * get object child node value
 * 获取对象的属性（支持多级）
 * @param object
 * @param node
 * @return {string}
 */
export const goc = (object: any, node: string = ''): any => {
  if (!object) return ''
  if (typeof object !== 'object') return ''

  if (node === '') return JSON.stringify(object)

  const p = node.split('.')
  let tmp = ''
  for (let i = 0; i < p.length; i++) {
    if (i === 0) tmp = object
    const key = p[i]
    if (key && tmp) {
      tmp = tmp[key]
    }
  }
  return isExist(tmp) ? tmp : ''
}

/**
 * 将对象转变为 params string
 * e.g. { name: 'user', age: 13} => name=user&age=13
 * @param obj
 * @return {*}
 */
export const obj2params = (
  obj: {},
  prefix: string = '',
  suffix: string = '',
): string => {
  if (typeof obj !== 'object' || !obj) return ''

  let params = []
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (obj[key] instanceof Object) { // 数组和对象特殊处理
        params.push(`${key}=${JSON.stringify(obj[key])}`)
      } else {
        params.push(`${key}=${obj[key]}`)
      }
    }
  })
  return prefix + params.join('&') + suffix
}

/**
 * 根据value获取数组对象[{label, value}]的label值
 * @param items
 * @param value
 * @return {string | null}
 */
export const getItemLabelByValue = (
  items: Array<any>,
  value: string | number,
): string => {
  const found = items.filter(item => item.value === value)
  if (found.length > 0) {
    return found[0].label
  }
  return ''
}
/**
 * 根据value数组获取数组对象[{label, value}]的多个label值
 */
export const getItemLabelsByValue = (
  items: Array<any>,
  value: Array<any>,
): string => {
  let labels = []
  value.forEach(val => {
    const findItem = items.find(item => item.value === val)
    if (findItem) {
      labels.push( findItem.label )
    }
  })
  return labels.join('，')
}

/**
 * 对象转下拉数组
 * @param obj
 * @return {Array}
 */
export const object2labelValue = (obj: {}) => {
  const result = []
  Object.keys(obj).map(key => {
    result.push({ label: obj[key], value: key })
  })
  return result
}

/**
 * 参数对象里日期起始数组转字符串
 */
export const paramsDateRange2string = (
  params: any,
  dateKey: string,
  fromKey: string,
  toKey: string,
) => {
  params = { ...params } // 解构第一层，目的是为了兼容immutable数据的赋值
  if (params && params[dateKey]) {
    params[fromKey] = params[dateKey][0]
    params[toKey] = params[dateKey][1]
    delete params[dateKey]
  }
  return params
}

/**
 * url参数对象里字符串转日期起始数组
 */
export const paramsString2DateRange = (
  params: any,
  dateKey: string,
  fromKey: string,
  toKey: string,
) => {
  params = { ...params } // 解构第一层，目的是为了兼容immutable数据的赋值
  if (params[fromKey] && params[toKey]) {
    params[dateKey] = [Number(params[fromKey]), Number(params[toKey])]
    delete params[fromKey]
    delete params[toKey]
  }
  return params
}

/**
 * @param target {} 需要判断是否存在的值
 * @return boolean true表示存在（包括0，false），false表示不存在
*/
export const isExist = (target: any) => (target !== undefined && target !== null)

/**
 * object convert to FormData
 * @param data
 * @return {FormData}
 */
export const obj2FormData = (data: {}) => {
  const f = new FormData()
  for (let key in data) {
    f.append(key, data[key])
  }
  return f
}
