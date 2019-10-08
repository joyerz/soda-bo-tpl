// @flow
import * as React from 'react'
import { Layout, Icon } from 'antd'
import UserManager from 'src/services/userManager'
import isMobile from 'utils/browserDetect'
import { get as storageGet, save as storageSet } from 'utils/localStore'
import Nav from './com/nav'
import Header from './com/header'
import Footer from './com/footer'
import './index.scss'

const logo = require('assets/images/Group@2x.png')

const { Sider, Content } = Layout

type Props = {
  children: React.Node
}
type State = {
  collapsed: boolean
}


export default class LayoutLayer extends React.Component<Props, State> {

  sideKey = 'SIDE_COLLAPSED'   // 左侧菜单显示隐藏本地储存key

  state = {
    collapsed: storageGet(this.sideKey),
  }


  mounted = false
  isInLogin = UserManager.isInLoginPage() // 记录路由登录地址变化

  componentWillUnmount() {
    this.mounted = false
    window.removeEventListener('resize', this.resize)

    // 移除history listener
    UserManager.removeHistoryWatcher('layout')
  }

  componentDidMount() {
    this.mounted = true
    window.addEventListener('resize', this.resize)
    // this.resize()

    // 监听路由变化，如果路由从登录/设置密码等页面切换到登录后的页面需要刷新layout
    UserManager.addHistoryWatcher({
      name: 'layout',
      cb: () => {
        if (!this.mounted) return
        const isInLogin = UserManager.isInLoginPage()
        if (this.isInLogin !== isInLogin) {
          this.isInLogin = isInLogin
          this.setState({})
        }
      },
    })
  }

  resize = (): void => {
    const collapsed = window.innerWidth < 992
    if (collapsed !== this.state.collapsed) {
      this.setState({ collapsed })
    }
  }

  toggle = (): void => {
    let collapsed = !this.state.collapsed
    storageSet(this.sideKey, collapsed)
    this.setState({ collapsed })
  }

  render() {
    const { collapsed } = this.state

    return UserManager.isInLoginPage()
      ? (
        <div>{this.props.children}</div>
      )
      : (
        isMobile()
          ? <div>
            <Header />
            {this.props.children}
          </div>
          : (
            <Layout className="layout">
              <Sider
                trigger={
                  <Icon className="trigger" type={collapsed ? 'right' : 'left'} />
                }
                collapsible
                collapsed={collapsed}
                onCollapse={this.toggle}
                reverseArrow
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                  zIndex: 2,
                }}
              >
                <div className="logo">
                  <img src={logo} />
                </div>
                <Nav collapsed={collapsed} />
              </Sider>

              <Layout className={`right ${collapsed ? 'collapsed' : ''}`}>
                <Header />
                <Content id="content" style={{ minHeight: 280, paddingBottom: 40 }}>
                  {this.props.children}
                </Content>

                <Footer />
              </Layout>
            </Layout>
          )
      )
  }
}
