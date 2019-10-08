// @flow
import * as React from 'react'
import { Menu, Spin, } from 'antd'
import { pathInfo, replaceto } from 'utils/url'
import type { ActionModifyT, VoidFuncT } from 'src/types/actions'
import UserManager from 'src/services/userManager'
import Code from './code'
import Password from './password'
import './login.scss'

type Props = {
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
  sendCode: any,
}

type State = {
  type: string,
  codeNeed: any,
}

export default class Login extends React.PureComponent<Props, State> {
  state = {
    type: location.hash === '#password' ? 'password' : 'sms', // password | sms
    codeNeed: null,
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
    UserManager
      .checkLoginCodeNeeded()
      .then(codeNeed => this.mounted && this.setState({ codeNeed }))
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  toggle = (e: any) => {
    this.setState({ type: e.key })
    replaceto(`#${e.key}`)
  }

  render() {
    const { codeNeed } = this.state
    return (
      <div styleName="login-form">
        <div styleName="title">
          <Menu onClick={this.toggle} selectedKeys={[this.state.type]} mode="horizontal">
            {
              codeNeed &&
              <Menu.Item key="sms">
                短信登录
              </Menu.Item>
            }
            <Menu.Item key="password" style={!codeNeed ? { width: '100%' } : {}}>
              密码登录
            </Menu.Item>
          </Menu>
        </div>

        <div className="paddingT24 page-login" style={{ display: (codeNeed && this.state.type === 'sms') ? 'block' : 'none' }}>
          <Code
            data={this.props.sendCode}
            actionSendCode={this.props.actionSendCode}
            actionSendCodeReset={this.props.actionSendCodeReset}
          />
        </div>
        <div className='paddingT24 page-login' style={{ display: (this.state.type === 'password' || !codeNeed) ? 'block' : 'none' }}>
          <Password />
        </div>
      </div>
    )
  }
}
