// @flow
import * as React from 'react'
import Form from 'com/Form'
import { Menu } from 'antd'
import { goto } from 'utils/url'
import UserManager from 'src/services/userManager'
import { messageActionFailure } from 'utils/messageHelper'
import fieldsConfig from './setPasswordConf'

import './setPassword.scss'

type Props = {}

type State = {
  type: string,
  data: {}
}

export default class SetPassword extends React.Component<Props, State> {
  state = {
    type: 'password', // password | sms
    data: {
      username: '用户名',
    },
  }
  mounted = false

  componentWillUnmount(): void {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true

    if (!UserManager.getToken()) {
      goto('/login')
    } else {
      UserManager
        .fetchUserInfo()
        .then((res: any) => {
          if (this.mounted) {
            this.setState({
              data: { username: `用户名: ${res?.username}` },
            })
          }
        })
    }
  }

  toggle = (e: any) => this.setState({ type: e.key })

  onSubmit = (data: any) => {
    if (data.new_password !== data.new_password_confirm) {
      messageActionFailure('passwordNotMatch')
      return
    }

    UserManager.setPassword(data.new_password)
  }

  onReset = () => {

  }

  render() {
    return (
      <div styleName="container">
        <div styleName="frame">
          <div styleName="title">
            <Menu onClick={this.toggle} selectedKeys={[this.state.type]} mode="horizontal">
              <Menu.Item key="password">
                设置密码
              </Menu.Item>
            </Menu>
          </div>

          <div className='paddingT24'>
            <Form
              fieldsConf={fieldsConfig}
              dataSource={this.state.data}
              onSubmit={this.onSubmit}
              onReset={this.onReset}
            />
          </div>

        </div>
      </div>
    )
  }
}