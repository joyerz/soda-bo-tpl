import { isReady } from 'utils/common'

class AmapGEO {
  geocoder = null

  constructor() {
    this.init()
  }

  async init() {
    await isReady(() => window.AMap)
    let AMap = window.AMap
    AMap.plugin('AMap.Geocoder', () => {
      this.geocoder = new AMap.Geocoder()
    })
  }

  async getAddressByLocation(longitude: number, latitude: number): any {
    await isReady(() => this.geocoder)

    return new Promise((resolve) => {
      try {
        this.geocoder.getAddress([longitude, latitude], (status, result) => {
          if (status === 'complete') {
            if (result.info === 'OK') {
              // result中对应详细地理坐标信息
              const address = result.regeocode.formattedAddress
              resolve(address)
            }
            else {
              resolve('')
            }
          }
        })
      } onError(err) {
        console.log(err)
        resolve('')
      }
    })
  }
}

const instant = () => {
  let i = null
  return () => {
    if (!i) {
      i = new AmapGEO()
    }
    return i
  }
}

export default instant()()
