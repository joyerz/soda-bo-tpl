export const MODULE_TITLE = {
  add: '添加',
  edit: '编辑',
  view: '查看'
}

// ---------后端枚举类型--------------------------------

// 用户模块
export const CUSTOMER = {
  status: {
    NORMAL: '正常',
    ACTIVE: '正常',
    BLOCK: '黑名单',
    INACTIVE: '已注销'
  },
  identity_authentication_status: {
    SYSTEM_APPROVED: '系统通过',
    SYSTEM_FAILED: '不通过',
    SYSTEM_UNAPPROVED: '不通过',
    MANUAL_APPROVED: '人工通过',
    MANUAL_UNAPPROVED: '不通过'
  },
  authentication_status: {
    NOT_SUBMITTED: '未提交',
    PENDING: '待审核',
    SYSTEM_APPROVED: '系统通过',
    MANUAL_APPROVED: '人工通过',
    DENIED: '驳回',
    REFUSED: '拒绝',
    FAILED: '失败'
  },
  first_audit_status: {
    PENDING: '待审核',
    APPROVED: '通过',
    DENIED: '驳回',
    REFUSED: '拒绝'
  },
  second_audit_status: {
    PENDING: '待审核',
    APPROVED: '通过',
    DENIED: '驳回',
    REFUSED: '拒绝'
  },
  reaudit_status: {
    APPROVED: '通过',
    FAILED: '失败',
    DENIED: '驳回',
    REFUSED: '拒绝'
  },
  type: {
    NORMAL: '普通用户',
    COMPANY: '公司用户'
  },
  company_account_status: {
    INACTIVE: '未通过',
    ACTIVE: '已通过'
  },
  change_log_status: {
    system_audit: '系统审核',
    first_audit: '一审',
    second_audit: '二审',
    reaudit: '复审',
    customer_base_info: '基本信息修改',
    change_mobile_forcibly: '手机号修改',
    customer_certificate: '证件信息修改',
    identity_authentication_status: 'NCIIC',
    default_station: '默认站点',
    driving_license: '驾照提交',
    driving_license_front_image: '驾照正面提交',
    driving_license_back_image: '驾照背面提交',
    driving_license_image_recognition: '驾照识别',
    driving_license_authentication_status: '驾照状态修改',
    change_email: '绑定公司邮箱',
    change_email_forcibly: '公司信息修改',
    id_card: '身份证信息提交',
    id_card_front_image: '身份证正面提交',
    id_card_back_image: '身份证背面提交',
    change_password_base_on_channel: '用户修改密码'
  },
  agreement: {
    CUSTOMER_AGREEMENT: '隐私协议',
    RENTAL_AGREEMENT: '一般条款与条件'
  },
  reject_reason: {
    A: '上传身份证不符合要求',
    B: '上传身份证不清晰',
    C: '上传身份证已过期',
    D: '上传身份证信息重复',
    E: '上传驾照不符合要求',
    F: '上传驾照不清晰',
    G: '上传驾照已过期',
    H: '上传驾照类型不符合',
    I: 'NCIIC未通过',
    J: '其它',
    'SYSTEM AUDIT FAILED': '系统审核失败'
  }
}

// 驾照等级
export const DRIVING_LEVEL = [
  { value: 'A1', label: 'A1' },
  { value: 'A2', label: 'A2' },
  { value: 'A3', label: 'A3' },
  { value: 'B1', label: 'B1' },
  { value: 'B2', label: 'B2' },
  { value: 'C1', label: 'C1' },
  { value: 'C1D', label: 'C1D' },
  { value: 'C1E', label: 'C1E' },
  { value: 'C2', label: 'C2' },
  { value: 'C3', label: 'C3' },
  { value: 'C4', label: 'C4' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'M', label: 'M' },
  { value: 'N', label: 'N' },
  { value: 'P', label: 'P' },
  { value: 'Other', label: '其他' }
]

// 性别
export const GENDER = [
  { label: '男', value: '男' },
  { label: '女', value: '女' }
]

// 账号
export const ACCOUNT_STATUS = {
  true: '启用',
  false: '已禁用'
}

export const ACCOUNT_STATUS_BADGE = {
  true: 'success',
  false: 'warning'
}

/* 预约状态 */
export const RESERVATION_STATUS = {
  APPROVE: '通过',
  REJECT: '拒绝',
  PENDING: '审核中'
}

/*
 * 车辆管理
 * */
// 工作状态
export const VEHICLE_WORK_STATUS = {
  IDEL: '空闲',
  IN_USE: '使用中'
}
// 可用状态
export const VEHICLE_AVAILABLE_STATUS = {
  available: '可用',
  notAvailable: '不可用'
}
// 车机在线状态
export const VEHICLE_MACHINE_STATUS = {
  on: '在线',
  off: '离线'
}
// 站点服务类型
export const STATION_SERVICE_TYPE = {
  BOOKING: '短租',
  SHUTTLE: '接送'
}
// 出行类型
export const TRAVEL_TYPE = {
  shortRent: '短租车',
  shuttle: '接送车'
}
// 订单类型
export const ORDER_TYPE = {
  shortRent: '短租车',
  highEndShuttle: '高端接送'
}
// 付款类型
export const PAYMENT_TYPE = {
  online: '线上',
  offline: '线下'
}
// 车辆能源类型
export const ENERGE_TYPE = {
  PETROL: '燃油',
  ELECTRIC: '电'
}
// 车辆牌照性质
export const PLATE_TYPE = {
  OPERATION: '营运',
  UNOPERATION: '非营运',
  RENT: '租赁'
}

// 发票状态
export const INVOICE_STATUS = {
  doing: '开票中',
  done: '已开票'
}
// 账号类型
export const ACCOUNT_TYPE = {
  platform: '平台',
  station: '站点',
  carDealer: '汽车经销商'
}
// 账号状态
/*export const ACCOUNT_STATUS = {
  enable: '启用中',
  disabled: '禁用中'
}*/
// 角色状态
export const ROLE_STATUS = {
  enable: '启用中',
  disabled: '禁用中'
}

/* 时间段类型 */
export const TIME_TYPE = {
  LOW_SEASON: '淡季',
  HIGH_SEASON: '旺季',
  STATUTORY_HOLIDAY: '法定节假日'
}

/* 定价管理-》定价类型 */
export const PRICING_TYPE = {
  SHORT_RENTAL: '短租车',
  PICK_UP: '接送车'
}
