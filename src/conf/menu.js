// @flow
import loadable from '@loadable/component'

export default [
  /*{
    key: 'customer',
    name: '用户管理',
    icon: 'bank',
    permission: '',
    type: 'TENANT',
    path: [
      '/customer',
      '/customer/add',
      '/customer/edit/:id',
      '/customer/view/:id'
    ],
    component: loadable((): any => import('../pages/customer'))
  },*/
  // {
  //   key: 'user-management',
  //   name: '用户管理',
  //   icon: 'user',
  //   permission: '',
  //   subMenu: [
  //     {
  //       key: 'customer',
  //       name: '用户列表',
  //       path: ['/customer'],
  //       component: loadable(
  //         (): any => import('../pages/customerManagement/customerList')
  //       ),
  //       permission: ''
  //     },
  //     {
  //       key: 'customer-audit',
  //       name: '用户审核',
  //       path: ['/customerAudit'],
  //       component: loadable(
  //         (): any => import('../pages/customerManagement/customerAudit')
  //       ),
  //       permission: ''
  //     },
  //     {
  //       key: 'customer-evaluate',
  //       name: '用户评价',
  //       path: ['/customerEvaluate'],
  //       component: loadable(
  //         (): any => import('../pages/customerManagement/customerEvaluate')
  //       ),
  //       permission: ''
  //     }
  //   ]
  // },
  {
    key: 'driver-management',
    name: '司机车务管理',
    icon: 'dashboard',
    permission: '',
    subMenu: [
      {
        key: 'short-rental',
        name: '短租车任务',
        path: ['/shortRental'],
        component: loadable((): any =>
          import('../pages/driverManagement/shortRental')
        ),
        permission: ''
      },
      {
        key: 'transfer',
        name: '接送车任务',
        path: ['/transfer'],
        component: loadable((): any =>
          import('../pages/driverManagement/transfer')
        ),
        permission: ''
      },
      {
        key: 'vehicle-access',
        name: '车辆出入库',
        path: ['/vehicleAccess'],
        component: loadable((): any =>
          import('../pages/driverManagement/vehicleAccess')
        ),
        permission: ''
      },
      {
        key: 'driver',
        name: '司机管理',
        path: ['/driver'],
        component: loadable((): any =>
          import('../pages/driverManagement/driver')
        ),
        permission: ''
      },
      {
        key: 'car-service',
        name: '车务管理',
        path: ['/carService'],
        component: loadable((): any =>
          import('../pages/driverManagement/carService')
        ),
        permission: ''
      }
    ]
  },
  // {
  //   key: 'vehicle-management',
  //   name: '车辆管理(M)',
  //   icon: 'car',
  //   permission: '',
  //   subMenu: [
  //     {
  //       key: 'vehicleList',
  //       name: '车辆列表',
  //       path: ['/vehicleList'],
  //       component: loadable(
  //         (): any => import('../pages/vehicleManagement/vehicleList')
  //       )
  //     },
  //     {
  //       key: 'modelManagement',
  //       name: '车型款式管理',
  //       path: ['/modelManagement'],
  //       component: loadable(
  //         (): any => import('../pages/vehicleManagement/modelManagement')
  //       )
  //     },
  //     {
  //       key: 'vehicleMachineManagement',
  //       name: '车机管理',
  //       path: ['/vehicleMachineManagement'],
  //       component: loadable(
  //         (): any =>
  //           import('../pages/vehicleManagement/vehicleMachineManagement')
  //       )
  //     }
  //   ]
  // },

  {
    key: 'cooperation-company-management',
    name: '合作公司管理(M)',
    icon: 'book',
    permission: '',
    subMenu: [
      {
        key: 'cityList',
        name: '城市列表',
        path: ['/cityList'],
        component: loadable((): any =>
          import('../pages/cooperationCompanyManagement/cityList')
        )
      },
      {
        key: 'areaList',
        name: '区域列表',
        path: ['/areaList'],
        component: loadable((): any =>
          import('../pages/cooperationCompanyManagement/areaList')
        )
      },
      {
        key: 'stationList',
        name: '站点列表',
        path: ['/stationList'],
        component: loadable((): any =>
          import('../pages/cooperationCompanyManagement/stationList')
        )
      }
      // {
      //   key: 'driverSSList',
      //   name: '司机服务站列表',
      //   path: ['/driverSSList'],
      //   component: loadable(
      //     (): any =>
      //       import('../pages/cooperationCompanyManagement/driverSSList')
      //   )
      // }
    ]
  },

  {
    key: 'operational-monitor',
    name: '运营监控',
    icon: 'rocket',
    permission: '',
    subMenu: [
      {
        key: 'violation',
        name: '违章查询',
        path: ['/violation'],
        component: loadable((): any =>
          import('../pages/operationalMonitor/violation')
        ),
        permission: ''
      },
      {
        key: 'maintenance',
        name: '维保管理',
        path: ['/maintenance'],
        component: loadable((): any =>
          import('../pages/operationalMonitor/maintenance')
        ),
        permission: ''
      },
      {
        key: 'accident',
        name: '事故管理',
        path: ['/accident'],
        component: loadable((): any =>
          import('../pages/operationalMonitor/accident')
        ),
        permission: ''
      },
      {
        key: 'electric-fence-alarm',
        name: '电子围栏报警',
        path: ['/electricFenceAlarm'],
        component: loadable((): any =>
          import('../pages/operationalMonitor/electricFenceAlarm')
        ),
        permission: ''
      },
      {
        key: 'electric-fence-management',
        name: '电子围栏管理',
        path: ['/electricFenceManagement'],
        component: loadable((): any =>
          import('../pages/operationalMonitor/electricFenceManagement')
        ),
        permission: ''
      }
    ]
  },
  {
    key: 'pricing-management',
    name: '定价管理',
    icon: 'tags',
    permission: '',
    subMenu: [
      {
        key: 'short-pricing-list',
        name: '短租车定价列表',
        path: ['/shortPricingList'],
        component: loadable((): any =>
          import('../pages/pricingManagement/shortPricingList')
        ),
        permission: ''
      },
      {
        key: 'transfer-pricing-list',
        name: '接送车定价列表',
        path: ['/transferPricingList'],
        component: loadable((): any =>
          import('../pages/pricingManagement/transferPricingList')
        ),
        permission: ''
      },
      {
        key: 'period-pricing-list',
        name: '时间段设置',
        path: ['/periodPricingList'],
        component: loadable((): any =>
          import('../pages/pricingManagement/periodPricingList')
        ),
        permission: ''
      }
    ]
  },
  // {
  //   key: 'financial-management',
  //   name: '财务管理(M)',
  //   icon: 'transaction',
  //   permission: '',
  //   subMenu: [
  //     {
  //       key: 'financialData',
  //       name: '财务数据',
  //       path: ['/financialData'],
  //       component: loadable(
  //         (): any => import('../pages/financialManagement/financialData')
  //       )
  //     },
  //     {
  //       key: 'invoiceManagement',
  //       name: '发票管理',
  //       path: ['/invoiceManagement'],
  //       component: loadable(
  //         (): any => import('../pages/financialManagement/invoiceManagement')
  //       )
  //     }
  //   ]
  // },
  // {
  //   key: 'account-management',
  //   name: '账号管理(M)',
  //   icon: 'audit',
  //   permission: '',
  //   subMenu: [
  //     {
  //       key: 'accountList',
  //       name: '账号列表',
  //       path: ['/accountList'],
  //       component: loadable(
  //         (): any => import('../pages/accountManagement/accountList')
  //       )
  //     },
  //     {
  //       key: 'roleList',
  //       name: '角色列表',
  //       path: ['/roleList'],
  //       component: loadable(
  //         (): any => import('../pages/accountManagement/roleList')
  //       )
  //     }
  //   ]
  // },
  {
    key: 'system-management',
    name: '系统管理',
    icon: 'desktop',
    permission: '',
    subMenu: [
      {
        key: 'common-problem',
        name: '常见问题',
        path: ['/commonProblem'],
        component: loadable((): any =>
          import('../pages/systemManagement/commonProblem')
        )
      },
      {
        key: 'precautions',
        name: '注意事项',
        path: ['/precautions'],
        component: loadable((): any =>
          import('../pages/systemManagement/precautions')
        )
      },
      {
        key: 'phone',
        name: '电话管理',
        path: ['/phone'],
        component: loadable((): any =>
          import('../pages/systemManagement/phone')
        )
      },
      {
        key: 'protocol',
        name: '协议管理',
        path: ['/protocol'],
        component: loadable((): any =>
          import('../pages/systemManagement/protocol')
        )
      }
    ]
  }
]
