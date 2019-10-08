// 权限枚举
export const permissionEnum = {
  view: '查看', // 列表与详情
  add: '添加', // 新增或添加
  edit: '编辑', // 编辑
  delete: '删除', // 删除

  export: '导出', //
  import: '导入', //

  detect: '检测', // 设备检测
  assign: '分配', // 设备分配

  'detect-bind': '检测绑定', // 车辆检测绑定工具下
  'detect-bind-results': '检测结果', // 车辆检测绑定工具下

  'import-bind': '设备批量绑定', // 车辆列表下

  claim: '认领', // 车辆认领

  forbidden: '停用' // 账户
}

export default [
  // 设备管理
  {
    key: 'device-management',
    name: '设备管理',
    children: [
      {
        key: 'device-detection',
        name: '设备检测',
        permission: [
          {
            name: 'view',
            api: ['/device-check [GET]']
          },
          {
            name: 'detect',
            api: ['/device-check [POST]']
          },
          {
            name: 'export',
            api: ['/device-check/export [GET]']
          }
        ]
      },
      {
        key: 'device',
        name: '设备列表',
        permission: [
          {
            name: 'view',
            api: ['/device [GET]']
          },
          {
            name: 'add',
            api: ['/device [POST]']
          },
          {
            name: 'edit',
            api: ['/device/:id [PUT]']
          },
          {
            name: 'edit',
            api: ['/device/:id [PUT]']
          },
          {
            name: 'delete',
            api: ['/device/:id/disable [PUT]']
          },
          {
            name: 'import',
            api: ['/device/upload [POST]']
          },
          {
            name: 'export',
            api: ['/device/export [GET]']
          }
        ]
      },
      {
        key: 'device-assignment',
        name: '设备分配',
        permission: [
          {
            name: 'assign',
            api: ['/device-assign [POST]', '/dealer [GET]']
          }
        ]
      }
    ]
  },
  // 风控管理
  {
    key: 'risk-control',
    name: '风控管理',
    children: [
      {
        key: 'vehicle-realtime-control',
        name: '车辆实时风控',
        permission: [
          {
            name: 'view',
            api: [
              '/vehicle/statistic [GET]',
              '/risk-control-alert/unread-counts [GET]',
              '/vehicle [GET]',
              '/risk-control-alert [GET]',
              '/risk-control-alert/:id/read [PUT]'
            ]
          },
          {
            name: 'edit',
            api: [
              '/vehicle/:id/remark [PUT]',
              '/risk-control-alert/:id/clear [PUT]',
              '/risk-control-alert/clear [PUT]'
            ]
          },
          {
            name: 'export',
            api: ['/vehicle/export [GET]']
          }
        ]
      },
      {
        key: 'vehicle-track-query',
        name: '车辆轨迹查询',
        permission: [
          {
            name: 'view',
            api: ['/vehicle-telemetry [GET]']
          }
        ]
      },
      {
        key: 'alarm-history',
        name: '报警历史记录',
        permission: [
          {
            name: 'view',
            api: ['/risk-control-alert [GET]']
          },
          {
            name: 'edit',
            api: ['/risk-control-alert/${id}/handle [PUT]']
          },
          {
            name: 'export',
            api: ['/risk-control-alert/export [GET]']
          }
        ]
      },
      {
        key: 'alarm-rules-setting',
        name: '报警规则设置',
        permission: [
          {
            name: 'view',
            api: ['/risk-control-rule [GET]', '/risk-control-rule/:id [GET]']
          },
          {
            name: 'add',
            api: ['/risk-control-rule [POST]']
          },
          {
            name: 'edit',
            api: ['/risk-control-rule [PUT]']
          },
          {
            name: 'delete',
            api: ['/risk-control-rule [DELETE]']
          }
        ]
      }
    ]
  },

  // 车辆管理
  {
    key: 'vehicle-management',
    name: '车辆管理',
    children: [
      {
        key: 'bind-vehicle',
        name: '车辆检测绑定工具',
        permission: [
          {
            name: 'detect-bind',
            api: [
              '/device [GET]',
              '/vehicle/device-bind-check [PUT]',
              '/vehicle/check [POST]'
            ]
          },
          {
            name: 'detect-bind-results',
            api: ['/vehicle/check-histories [GET]']
          },
          {
            name: 'export',
            api: [''] // 暂时没有
          }
        ]
      },
      {
        key: 'vehicle',
        name: '车辆列表',
        permission: [
          {
            name: 'view',
            api: ['/vehicle [GET]']
          },
          {
            name: 'add',
            api: ['/vehicle [POST]', '/brand [GET]', '/model [GET]']
          },
          {
            name: 'edit',
            api: ['/vehicle/:id [PUT]', '/brand [GET]', '/model [GET]']
          },
          {
            name: 'delete',
            api: ['/vehicle/:id [DELETE]']
          },
          {
            name: 'import',
            api: ['/vehicle/import [POST]']
          },
          {
            name: 'import-bind',
            api: ['/vehicle/device-bind-batch [POST]']
          }
        ]
      },
      {
        key: 'claim-vehicle',
        name: '车辆认领',
        permission: [
          {
            name: 'claim',
            api: ['/account/me/vehicle-claim [PUT]']
          }
        ]
      },
      {
        key: 'assign-vehicle',
        name: '车辆分配',
        permission: [
          {
            name: 'assign',
            api: ['/vehicle/distribution [PUT]', '/dealer [GET]']
          }
        ]
      },
      {
        key: 'model',
        name: '车型管理',
        permission: [
          {
            name: 'view',
            api: ['/model [GET]']
          },
          {
            name: 'add',
            api: [
              '/model [POST]',
              '/brand [GET]',
              '/container/default/blob [POST]'
            ]
          },
          {
            name: 'edit',
            api: [
              '/model/:id [PUT]',
              '/brand [GET]',
              '/container/default/blob [POST]'
            ]
          },
          {
            name: 'export',
            api: ['/model/export [GET]']
          }
        ]
      },
      {
        key: 'brand',
        name: '品牌管理',
        permission: [
          {
            name: 'view',
            api: ['/brand [GET]']
          },
          {
            name: 'add',
            api: ['/brand [POST]', '/container/default/blob [POST]']
          },
          {
            name: 'edit',
            api: ['/brand/:id [PUT]', '/container/default/blob [POST]']
          },
          {
            name: 'export',
            api: ['/brand/export [GET]']
          }
        ]
      }
    ]
  },

  // 用户管理
  {
    key: 'user-management',
    name: '用户管理',
    children: [
      {
        key: 'user',
        name: '用户列表',
        permission: [
          {
            name: 'view',
            api: ['/user [GET]']
          }
        ]
      }
    ]
  },

  // 保险管理
  {
    key: 'insurance-management',
    name: '保险管理',
    children: [
      {
        key: 'insurance-request',
        name: '预约处理',
        permission: [
          {
            name: 'view',
            api: ['/insurance-request [GET]']
          },
          {
            name: 'edit',
            api: [
              '/insurance-request/:id/:delayed [PUT]',
              '/insurance-request/:id/:cancelled [PUT]'
            ]
          }
        ]
      }
    ]
  },

  // 账户管理
  {
    key: 'account-management',
    name: '账户管理',
    children: [
      {
        key: 'account-list',
        name: '账户列表',
        permission: [
          {
            name: 'view',
            api: ['/account [GET]']
          },
          {
            name: 'edit',
            api: ['/account/:id [PUT]']
          },
          {
            name: 'add',
            api: ['/account [POST]']
          },
          {
            name: 'forbidden',
            api: ['/account/:id/state [PUT]']
          }
        ]
      },
      {
        key: 'role-management',
        name: '角色管理',
        permission: [
          {
            name: 'view',
            api: ['/role [GET]']
          },
          {
            name: 'item',
            api: ['/role/:id [PUT]']
          },
          {
            name: 'add',
            api: ['/role [POST]', '/resource/role/new [GET]']
          },
          {
            name: 'edit',
            api: ['/role/:id [PUT]', '/resource/role/:id [GET]']
          },
          {
            name: 'delete',
            api: ['/role/:id [PUT]']
          }
        ]
      },
      {
        key: 'factory-list',
        name: '主机厂列表',
        permission: [
          {
            name: 'view',
            api: ['/manufacturer [GET]']
          },
          {
            name: 'item',
            api: ['/manufacturer/:id [PUT]']
          },
          {
            name: 'add',
            api: ['/manufacturer [POST]']
          },
          {
            name: 'edit',
            api: ['/manufacturer/:id/operate [PUT]']
          },
          {
            name: 'disable',
            api: ['/manufacturer/:id/operate [PUT]']
          }
        ]
      },
      {
        key: 'dealer-list',
        name: '经销商列表',
        permission: [
          {
            name: 'view',
            api: ['/dealer [GET]']
          },
          {
            name: 'item',
            api: ['/dealer/:id [PUT]']
          },
          {
            name: 'add',
            api: ['/dealer [POST]']
          },
          {
            name: 'edit',
            api: ['/dealer/:id/operate [PUT]']
          },
          {
            name: 'disable',
            api: ['/dealer/:id/operate [PUT]']
          }
        ]
      }
    ]
  },

  // 用户反馈
  {
    key: 'feedback',
    name: '用户反馈',
    children: [
      {
        key: 'feedback-list',
        name: '反馈列表',
        permission: [
          {
            name: 'view',
            api: ['/app-feedback [GET]']
          },
          {
            name: 'edit',
            api: ['/app-feedback/:id/read [PUT]']
          }
        ]
      }
    ]
  },

  // 平台配置
  {
    key: 'platform-conf',
    name: '平台配置',
    children: [
      {
        key: 'error-car-warm',
        name: '有误的车辆提醒',
        permission: [
          {
            name: 'view',
            api: ['/vehicle-wrong-alert [GET]']
          },
          {
            name: 'edit',
            api: ['/vehicle-wrong-alert/:id/read [PUT]']
          },
          {
            name: 'export',
            api: ['/vehicle-wrong-alert/export [GET]']
          }
        ]
      },
      {
        key: 'historical-track',
        name: '历史轨迹',
        permission: [
          {
            name: 'view',
            api: ['/platform-config/history-track [GET]']
          },
          {
            name: 'edit',
            api: ['/platform-config/history-track [PUT]']
          }
        ]
      },
      {
        key: 'indicator-score',
        name: '每月统计指标满分',
        permission: [
          {
            name: 'view',
            api: ['/platform-config/monthly-index [GET]']
          },
          {
            name: 'edit',
            api: ['/platform-config/monthly-index [PUT]']
          }
        ]
      },
      {
        key: 'SOS',
        name: 'SOS',
        permission: [
          {
            name: 'view',
            api: ['/sos-history [GET]']
          },
          {
            name: 'read',
            api: ['/sos-history/:id/read [PUT]']
          },
          {
            name: 'edit',
            api: ['/platform-config/sos [PUT]']
          },
          {
            name: 'data',
            api: ['/platform-config/sos [GET]']
          }
        ]
      },
      {
        key: 'insurance-description',
        name: '保险说明',
        permission: [
          {
            name: 'view',
            api: ['/platform-config/insurance-img [GET]']
          },
          {
            name: 'edit',
            api: ['/platform-config/insurance-img [PUT]']
          }
        ]
      }
    ]
  },

  // 系统管理
  {
    key: 'system-management',
    name: '系统管理',
    children: [
      {
        key: 'change-password',
        name: '修改密码',
        permission: [
          {
            name: 'edit',
            api: ['/account/me/password [PUT]']
          }
        ]
      }
    ]
  }
]
