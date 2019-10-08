# office

> used: react, react-router, react-redux, redux, redux-saga, react-css-modules, moment, sass (node10.16.0, yarn1.3.2/npm6.9.0 )


### 安装

下载项目后在项目根目录执行

```
# yarn
$ yarn install 

# npm 
$ npm install
```

### 开发

```
# yarn
$ yarn start

# npm
$ npm run start
```

### 代码格式检查

```
# yarn
$ yarn lint

# npm
$ npm run lint
```

### 静态类型校验

```
# yarn
$ yarn flow

# npm
$ npm run flow
```

浏览器输入: [http://localhost:3000](http://localhost:3000)

### 编译

```
# yarn
$ yarn build

# npm
$ npm run build
```


### 项目目录结构说明 /src
- |---- assets  // UI静态文件
- |---- components // 公共组件
- |---- conf // 全局配置
- |---- layout // 应用布局
- |---- pages // 模块应用入口/数据 - 控制层&数据层
- |---- routes // 路由管理
- |---- services // 全局服务单例
- |---- static // 下载类静态文件 
- |---- store // 全局数据层 
- |---- types // 静态类型(检查)定义
- |---- utils // 辅助函数


### 数据层/异步请求自动合并
基于插件 `build/reduxSagaHelperPlugin.js` 自动查找pages目录下的`redux.js` 和 `saga.js` 自动合并到`src/store/reducers.js` 和 `src/store/sagas.js`中

### 路由权限配置 src/conf/menu.js

```
[
  // 设备管理
  {
    key: 'device-management',  // 一级菜单
    name: '设备管理',  // 一级菜单名称
    icon: 'deployment-unit', // 图标设置
    permission: '',
    subMenu: [ // 二级菜单
      {
        key: 'device-detection', // 路由根 
        name: '设备检测',  // 二级菜单名
        path: ['/device-detection', '/device-detection/results'], // 同一个页面可以能有多个模块（路由）、
        component: loadable(
          (): any => import('../pages/deviceManagement/deviceDetection'), // 入口组件
        ),
        permission: 'device-detection/detect', // 对应访问权限（配置）
      },
       ...
    ],
  },
  ...
]
```
