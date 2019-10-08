const api = '/api' // api point
const authAPI = '/mbwuuli'
const dataAPI = '/mbkaar'
const rentalApi = '/mbriihi'
const taskApi = '/mbtasco'
const userApi = '/mbwuuli-admin'
const couponApi = '/mbtreasury' //op
const reportApi = '/op-ginkgoproxy'
const accountingApi = '/mbriihi'
const notificationSenderApi = '/mbnotification'

export const API = {
  noRepeat: {
    token: `${api}/common/token/generate`
  },
  login: {
    sendCode: userApi + '/users/verification-codes',
    byPassword: userApi + '/auth',
    loginCodeNeed: userApi + '/verification'
  },
  customer: {
    users: (page = 1, limit = 20) =>
      authAPI + `/users?page=${page}&page-limit=${limit}`,
    userDetail: id => authAPI + `/users/${id}`,
    authStatus: id =>
      authAPI + `/users/${id}/identity-authentication-status-requests`, // 修改征信
    userInfoUpdate: id => authAPI + `/users/${id}/customer-certificate-requests` // 修改用户信息 身份证 驾照信息
  },
  companyManage: {
    cityList: (page = 1, limit = 20) =>
      `${dataAPI}/cities?page=${page}&page-limit=${limit}`,
    cityAdd: `${dataAPI}/cities`,
    cityUpdate: id => `${dataAPI}/cities/${id}`,
    cityDelete: id => `${dataAPI}/cities/${id}`,

    areaList: (page = 1, limit = 20) =>
      `${dataAPI}/districts?page=${page}&page-limit=${limit}`,
    areaAdd: `${dataAPI}/districts`,
    areaUpdate: id => `${dataAPI}/districts/${id}`,
    areaDelete: id => `${dataAPI}/districts/${id}`,

    driverSSList: (page = 1, limit = 20) =>
      `${dataAPI}/service-stations?page=${page}&page-limit=${limit}`,
    driverSSAdd: `${dataAPI}/service-stations`,
    driverSSUpdate: id => `${dataAPI}/service-stations/${id}`,
    driverSSDelete: id => `${dataAPI}/service-stations/${id}`,

    stationList: (page = 1, limit = 20) =>
      `${dataAPI}/toyota-stations?page=${page}&page-limit=${limit}`,
    stationAdd: `${dataAPI}/toyota-stations`,
    stationSelect: id => `${dataAPI}/toyota-stations/${id}`,
    stationUpdate: id => `${dataAPI}/toyota-stations/${id}`,
    stationDelete: id => `${dataAPI}/toyota-stations/${id}`,
    stationEnable: id => `${dataAPI}/toyota-stations/${id}/enable`,
    stationDisable: id => `${dataAPI}/toyota-stations/${id}/disable`
  },
  /* 时间段设置 */
  timeBuckets: {
    list: (page = 1, limit = 10) =>
      `${couponApi}/time-buckets/list?page-no=${page}&page-size=${limit}`,
    add: `${couponApi}/time-buckets/add`, // POST
    edit: id => `${couponApi}/time-buckets/${id}`, // PUT
    item: id => `${couponApi}/time-buckets/${id}`, // GET
    del: id => `${couponApi}/time-buckets/${id}` // DEL
  },
  vehicleManage: {
    vehicleList: (page = 1, limit = 20) =>
      authAPI + `/mbkaar/tyt-vehicles?page=${page}&page-limit=${limit}`,
    vehicleAdd: `${api}/mbkaar/tyt-vehicles`,
    vehicleSelect: id => `${api}/mbkaar/tyt-vehicles/${id}`,
    vehicleUpdate: id => `${api}/mbkaar/vehicle-brands/${id}`,
    vehicleDelete: id => `${api}/mbkaar/vehicle-brands/${id}`,
    vehicleDisable: id => `${api}/mbkaar/tyt-vehicles/${id}/disable`,
    vehicleEnable: id => `${api}/mbkaar/tyt-vehicles/${id}/enable`,

    vehicleBrands: `${api}/mbkaar/vehicle-brands/tree`
  },
  /* 接送车定价列表 */
  periodPricingList: {
    list: (page, limit) =>
      `${couponApi}/pricing-plan/pickup-list?page-no=${page}&page-size=${limit}`,
    addVehicle: `${couponApi}/pricing-plan/add_by_vehicle`, // POST 新增车型
    addDistrict: `${couponApi}/pricing-plan/add_by_district`, // POST 新增区域
    item: id => `${couponApi}/pricing-plan/${id}`, // GET
    del: id => `${couponApi}/time-buckets/${id}` // DEL
  }
  /* 短租车定价列表 */
}

export default {}
