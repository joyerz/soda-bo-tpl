// @flow
import * as React from 'react'
import { Menu } from 'antd'
import type { ActionModifyT, VoidFuncT } from 'src/types/actions'

import UserManager from 'src/services/userManager'
import getImageCode from 'src/services/imageCodeGenerator'
import { goc } from 'utils/objectHelper'
import { goto, pathInfo } from 'utils/url'
import Form from 'com/Form'
import { messageActionFailure } from 'utils/messageHelper'
import fieldsConf from './forgotConf'
import fieldsSetPasswordConf from './forgotSetPasswordConf'
import './forgot.scss'

type PropsT = {
  data: {
    success: boolean,
    loading: boolean,
    error: boolean,
  },
  actionSendCode: ActionModifyT,
  actionSendCodeReset: VoidFuncT,
}

type StateT = {
  step: number,
  image: {
    src: ?string,
    uuid: ?string,
  },
  data: any,
  data1: any,
  count: number, // 发送验证码后的倒计时
  loading: boolean,
}

export default class Forgot extends React.PureComponent<PropsT, StateT> {
  state = {
    step: 1,
    image: {
      src: '',
      uuid: null,
    },
    data: {},
    data1: {},
    count: 0,
    loading: false
  }
  mounted = false

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
  }

  componentDidUpdate(prevProps: any): void {
    // 发送成功后，倒计时
    if (!prevProps.data.success && this.props.data.success) {
      this.sendCodeButtonCount()
    }
  }

  /**
   * 倒计时
   * @param count
   */
  sendCodeButtonCount = (count: number = 60) => {
    count--
    if (count <= 0) {
      count = 0
      this.props.actionSendCodeReset()
    }
    else {
      setTimeout(() => this.sendCodeButtonCount(count), 1000)
    }
    this.mounted && this.setState({ count })
  }


  /**
   * send sms code
   */
  onSendCode = () => {
    const data: any = {
      mobile: goc(this.state.data, 'mobile'),
      username: goc(this.state.data, 'username'),
    }
    this.props.actionSendCode({ data })
  }

  /**
   * on form changes
   * @param name
   * @param value
   * @param data
   */
  onChange = (name: string, value: any, data: any) => {
    this.setState({ data })
  }

  /**
   * 判断发送按钮的状态
   * @return {{count: number, enabled: (*|boolean)}}
   */
  checkSendCodeButtonStatus = () => {
    const { data } = this.state
    const result = data.mobile && data.mobile.length === 11 && data.username
    return {
      enabled: result && !this.props.data.success,
      count: this.state.count,
    }
  }

  /**
   * 下一步
   * @param data
   */
  onNextStep = (data: any) => {
    this.setState({
      data,
      step: 2,
    })
  }

  /**
   * 提交
   * @param data
   */
  onSubmit = (data: any) => {
    if (data.new_password !== data.new_password_confirm) {
      messageActionFailure('passwordNotMatch')
      return
    }

    this.setState({ loading: true })

    const { username, mobile, sms, new_password } = data
    // console.log(data)
    // return
    UserManager
      .setNewPassword(username, mobile, sms, new_password,  pathInfo().first === 'forgot')
      .then(res => {
        if (res === true) {
          goto(pathInfo().first === 'forgot' ? '/login#password' : '/login-staff#password')
        }
        else if (res === '验证码错误' || res === '验证码失败次数过多，请重新获取') {
          this.setState({ step: 1 })
          this.setState({ loading: false })
        }
      })
  }

  onReset = () => {
  }

  render() {
    const fields = fieldsConf({
      sendCodeButtonStatus: this.checkSendCodeButtonStatus(),
      onSendCode: this.onSendCode,
    })

    return (
      <div styleName="login-form">
        <div styleName="title">
          <Menu selectedKeys={['forgot']} mode="horizontal">
            <Menu.Item key="forgot">
              找回密码
            </Menu.Item>
          </Menu>

          <div className="paddingT24 page-login">
            <Form
              fieldsConf={fields}
              dataSource={this.state.data}
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              onReset={this.onReset}
            />
          </div>
        </div>
      </div>
    )
  }
}
