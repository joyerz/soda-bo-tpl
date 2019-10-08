// @flow
import * as React from 'react'
import { Menu, Icon } from 'antd'
import { pathInfo, goto, getPath } from 'utils/url'
import menuConfig from 'conf/menu'
import UserManager from 'src/services/userManager'

import './nav.scss'
import { isReady } from 'utils/common'

const SubMenu = Menu.SubMenu

export default class Nav extends React.Component<{ collapsed: boolean }, any> {
  mounted = false

  state = {
    defaultSeletedKey: [pathInfo().first],

    openKeys: [], // 存放一级菜单key
    selectedKeys: [], // 存放二级菜单key
  }
  rootSubmenuKeys = [] // 存放一级菜单key

  componentWillUnmount(): void {
    this.mounted = false
    UserManager.removeHistoryWatcher('nav-router-change')
    UserManager.removeAfterLogout('nav-logout')
  }

  componentDidMount(): void {
    this.mounted = true
    UserManager.addHistoryWatcher({
      name: 'nav-router-change',
      cb: () => {
        this.setState({})
      }
    })

    // 用户登录以后
    UserManager.userInfoDidFetch(() => {
      this.mounted && this.setState({})
    })

    UserManager.onAfterLogout({
      name: 'nav-logout',
      cb: () => {
        if (this.mounted) {
          console.log('onAfter logout')
          this.setState({})
        }
      }
    })

    // 直接网址进入页面，高亮对应菜单
    const path = window.location.pathname ? window.location.pathname.substring(1) : ''
    if (path) {
      let subMenuKey = ''
      menuConfig.forEach((item:Object) => {
        item.subMenu.forEach((item2) => {
          if (item2.key === path) {
            subMenuKey = item.key
          }
        })
      })
      this.setState({
        selectedKeys: [path],
        openKeys: [subMenuKey]
      })
    }
  }

  /*getMenu = () => {
    const result = []
    menuConfig.map(item => {
      result.push(
        <Menu.Item key={item.key} onClick={() => {
          goto(item.path[0])
        }}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </Menu.Item>
      )
    })
    return result
  }*/
  getMenu = () => {
    let result = []
    menuConfig.forEach((group) => {
      const subMenu = this.getSubMenu(group.subMenu)
      if (subMenu.length > 0) {
        this.rootSubmenuKeys.push(group.key)
        result.push(
          <SubMenu
            key={group.key}
            title={
              <span styleName="title">
                <Icon type={group.icon} />
                <span>{group.name}</span>
              </span>
            }
          >
            {subMenu}
          </SubMenu>,
        )
      }
    })
    return result
  }
  getSubMenu = (subMenu: Array<any>): Array<any> => {
    let result = []
    subMenu.forEach((item) => {
      if (UserManager.isPermission(item.permission)) {
        result.push(
          <Menu.Item
            key={item.key}
            onClick={() => goto(item.path[0])}
          >{item.name}</Menu.Item>,
        )
      }
    })
    return result
  }

  onOpenChange = (openKeys: Array<any>) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }
  // 点击二级菜单项
  onClickItem = (tt:Object) => {
    console.log(tt)
    this.setState({
      selectedKeys: [tt.key],
      // openKeys: [tt.keyPath[1]]
    })
  }

  render() {
    const { collapsed } = this.props
    const key = pathInfo().first

    return (
      <Menu
        // key={key}
        mode="inline"
        theme="dark"
        style={{paddingBottom: '80px'}}
        // defaultSelectedKeys={[key]}

        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={this.state.selectedKeys}
        onClick={this.onClickItem}

      >
        {this.getMenu()}
      </Menu>
    )
  }
}
