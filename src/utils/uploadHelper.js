import UUID from 'uuid-js'

export default {}

/**
 * 对form的数据进行提取到新结构
 * @param handleData form表单提取的data - object
 * @param key: 上传控件（Upload）的name
 */
export const dataFromUploadFiles = (handleData: {}, key: string, fileKey: string = 'name'): {} => {
  const result = {}
  for(let k in handleData) {
    if (k !== key) {
      result[k] = handleData[k]
    }
  }

  result[key] = []
  handleData[key] && handleData[key].forEach((image) => {
    result[key].push(image[fileKey])
  })
  return result
}


/**
 * 服务端返回的URL数组转换成Upload控件能理解的数组对象
 * @param arr
 * @return {object}
 */
export const imagesArray2UploadFiles = (arr: Array<string> | null): Array<{}> => {
  if (!arr) return []

  const result = []
  arr.forEach((item) => result.push(url2fileObject(item)))

  return result
}

/**
 * 将字符串图片地址转换成upload控件需要的object对象
 * @param url
 * @return {{uid: *, name: string, thumbUrl: string, url: string, status: string}}
 */
export const url2fileObject = (url: string) => ({
  name: getFileName(url),
  status: 'done',
  thumbUrl: url,
  url: url,
  uid: UUID.create().hex,
})

/**
 * 从服务器地址解析文件名
 * @param url
 * @return {string}
 */
export const getFileName = (url: string): string => {
  const search = url.match(/(\w)+.(\w)+[?]/g)
  return search
    ? search[0].replace('?', '')
    : ''
}
